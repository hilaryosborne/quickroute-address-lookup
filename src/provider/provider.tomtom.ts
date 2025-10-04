import QuickRouteProviderI from "./provider.interface";
import QuickRouteProviderTomTomResponse, { ProviderTomTomSearchResponseResult } from "./provider.tomtom.response.type";
import LocationTomTomModel, { LocationTomTomModelType } from "../models/location.tomtom.model";
import { SearchByPartialAddressParams } from "../address.lookup";
import QuickRouteProviderErrors from "./provider.errors";
import HttpClient from "../client/client.http";
import QuickRouteLoggerI from "../logger/logger.interface";
import { QuickRouteCacheI } from "../cache";
import QuickRouteProviderBase, { QuickRouteProviderBaseParams } from "./provider.base";
import {
  ProviderTomTomFuzzySearchParams,
  ProviderTomTomFuzzySearchRequest,
  ProviderTomTomFuzzySearchRequestType,
} from "./provider.tomtom.request.type";

type QuickRouteProviderTomTomApi = {
  key: string;
  protocol: string;
  host: string;
  port?: number;
};

type QuickRouteProviderTomTomParams = QuickRouteProviderBaseParams &
  Partial<{ api: Partial<QuickRouteProviderTomTomApi> }>;
class QuickRouteProviderTomTom extends QuickRouteProviderBase implements QuickRouteProviderI {
  protected api: QuickRouteProviderTomTomApi;
  protected logger?: QuickRouteLoggerI;
  protected cache?: QuickRouteCacheI;

  constructor(params?: QuickRouteProviderTomTomParams) {
    super(params);
    this.api = {
      key: params?.api?.key || process.env.PROVIDER_TOMTOM_API_KEY!,
      protocol: params?.api?.protocol || process.env.PROVIDER_TOMTOM_API_PROTOCOL!,
      host: params?.api?.host || process.env.PROVIDER_TOMTOM_API_HOST!,
      port: params?.api?.port || Number(process.env.PROVIDER_TOMTOM_API_PORT) || undefined,
    };
    if (!this.api.key) throw new Error(QuickRouteProviderErrors.MISSING_PROVIDER_API_KEY);
    if (!this.api.protocol) throw new Error(QuickRouteProviderErrors.MISSING_PROVIDER_API_PROTOCOL);
    if (!this.api.host) throw new Error(QuickRouteProviderErrors.MISSING_PROVIDER_API_HOST);
  }

  public async searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationTomTomModelType[]> {
    if (!this.logger) throw new Error(QuickRouteProviderErrors.MISSING_PROVIDER_LOGGER);
    if (!this.cache) throw new Error(QuickRouteProviderErrors.MISSING_PROVIDER_CACHE);
    const cached = await this.cache.getByPartialAddress<LocationTomTomModelType>("TomTom", params);
    if (cached) return cached;
    // REQUEST
    const query = encodeURIComponent(params.query.trim());
    if (!query || query.length === 0) throw new Error(QuickRouteProviderErrors.MISSING_PROVIDER_SEARCH_QUERY);
    const http = new HttpClient({
      base: { protocol: this.api.protocol, host: this.api.host, port: this.api.port },
      logger: this.logger,
    });
    const httpParams = ProviderTomTomFuzzySearchParams.parse(params.options || {});
    const geobias = httpParams.lat && httpParams.lng ? `point:${httpParams.lat},${httpParams.lng}` : undefined;
    const httpArgs = ProviderTomTomFuzzySearchRequest.parse({ ...httpParams, geobias, key: this.api.key });

    const httpOpts = {
      headers: {
        "X-Client-Id": params.tracking?.client || "",
        "X-Correlation-Id": params.tracking?.correlation || "",
        "X-Conversation-Id": params.tracking?.conversation || "",
      },
      logger: {
        onRequest: (req: {
          endpoint: string;
          params: ProviderTomTomFuzzySearchRequestType;
          opts: Record<string, unknown>;
        }): any => {
          delete req.params.key;
          delete req.opts.logger;
          return req;
        },
        onResponse: (res: {
          endpoint: string;
          params: ProviderTomTomFuzzySearchRequestType;
          opts: Record<string, unknown>;
          response: QuickRouteProviderTomTomResponse;
        }): any => {
          delete res.params.key;
          delete res.opts.logger;
          return res;
        },
      },
    };
    const httpEndpoint = `search/2/search/${query}.json`;
    const response = await http.get<QuickRouteProviderTomTomResponse>(httpEndpoint, httpArgs, httpOpts);

    // MAPPING
    const results = response.results.map<LocationTomTomModelType>((result) => {
      const mapped: LocationTomTomModelType = {
        id: this.getLocationId(result),
        provider: params.expands?.indexOf("provider") !== -1 ? this.expandProvider(result) : undefined,
        address: params.expands?.indexOf("address") !== -1 ? this.expandAddress(result) : undefined,
        geo: params.expands?.indexOf("geo") !== -1 ? this.expandGeo(result) : undefined,
      };
      return LocationTomTomModel.parse(mapped);
    });
    // we could trust the order from the provider, but let's be sure
    // assumption: higher score is better so lets show those first
    const ordered = results.sort((a, b) => (b.provider?.score || 0) - (a.provider?.score || 0));
    // hmm, I wonder if we should group the results by state, city, suburb?
    // when a lon,lat is not provided the list is pretty random
    await this.cache.setForPartialAddress<LocationTomTomModelType>("TomTom", params, ordered);
    return ordered;
  }

  protected getLocationId(location: ProviderTomTomSearchResponseResult): string | undefined {
    return location.address?.freeformAddress
      ? location.address.freeformAddress
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-")
      : undefined;
  }

  protected expandAddress(location: ProviderTomTomSearchResponseResult): LocationTomTomModelType["address"] {
    return {
      display: location.address?.freeformAddress,
      street: {
        number: location.address?.streetNumber,
        name: location.address?.streetName,
        // not sure about this one
        // tomtom seems to have varied results for street type
        // there isn't a dedicated field... the type field sometimes comes back with "Address Range" huh?
        // convert to kebab-case for consistency and just to be safe
        type: location.type
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-"),
      },
      suburb: location.address?.municipalitySubdivision,
      city: location.address?.municipality,
      state: {
        name: location.address?.countrySubdivisionName,
        code: location.address?.countrySubdivisionCode,
      },
      postcode: location.address?.postalCode,
      country: {
        name: location.address?.country,
        code: location.address?.countryCode,
      },
    };
  }

  protected expandGeo(location: ProviderTomTomSearchResponseResult): LocationTomTomModelType["geo"] {
    return {
      lat: location.position?.lat,
      lng: location.position?.lon,
    };
  }

  protected expandProvider(location: ProviderTomTomSearchResponseResult): LocationTomTomModelType["provider"] {
    return {
      type: "TomTom" as const,
      id: location.id,
      score: location.score,
      viewport: location.viewport
        ? {
            topLeftPoint: {
              lat: location.viewport?.topLeftPoint?.lat,
              lng: location.viewport?.topLeftPoint?.lon,
            },
            btmRightPoint: {
              lat: location.viewport?.btmRightPoint?.lat,
              lng: location.viewport?.btmRightPoint?.lon,
            },
          }
        : undefined,
    };
  }
}

export default QuickRouteProviderTomTom;
