import QuickRouteProviderI from "./provider.interface";
import QuickRouteProviderTomTomResponse, { ProviderTomTomSearchResponseResult } from "./provider.tomtom.response.type";
import LocationTomTomModel, { LocationTomTomModelType } from "../models/location.tomtom.model";
import { SearchByPartialAddressParams } from "../address.lookup";
import fetch from "node-fetch";
import { QuickRouteProviderErrors } from "./provider.errors";
import HttpClient from "../client/client.http";
import QuickRouteLoggerI from "../logger/logger.interface";
import { QuickRouteCacheI } from "../cache";
import QuickRouteProviderBase, { QuickRouteProviderBaseParams } from "./provider.base";

type QuickRouteProviderTomTomConfig = {
  typeahead: string;
  limit: string;
  countrySet: "AU";
  minFuzzyLevel: string;
  maxFuzzyLevel: string;
  idxSet: string;
  view: "Unified";
  relatedPois: "off";
};

type QuickRouteProviderTomTomApi = {
  apiKey: string;
  apiUrl: string;
};

type QuickRouteProviderTomTomParams = QuickRouteProviderBaseParams &
  Partial<QuickRouteProviderTomTomApi> & {
    config?: Partial<Omit<QuickRouteProviderTomTomConfig, "countrySet" | "countrySet" | "view" | "relatedPois">>;
  };
class QuickRouteProviderTomTom extends QuickRouteProviderBase implements QuickRouteProviderI {
  protected api: QuickRouteProviderTomTomApi;
  protected logger?: QuickRouteLoggerI;
  protected cache?: QuickRouteCacheI;
  protected config?: QuickRouteProviderTomTomConfig;

  constructor(params?: QuickRouteProviderTomTomParams) {
    super(params);
    this.api = {
      apiKey: params?.apiKey || process.env.TOMTOM_API_KEY!,
      apiUrl: params?.apiUrl || "https://api.tomtom.com",
    };
    if (!this.api.apiKey) throw new Error(QuickRouteProviderErrors.MISSING_API_KEY);
    if (!this.api.apiUrl) throw new Error(QuickRouteProviderErrors.MISSING_API_URL);
    this.config = {
      typeahead: params?.config?.typeahead || "true",
      limit: params?.config?.limit || "15",
      countrySet: "AU",
      minFuzzyLevel: params?.config?.minFuzzyLevel || "1",
      maxFuzzyLevel: params?.config?.maxFuzzyLevel || "2",
      idxSet: params?.config?.idxSet || "Addr,Str",
      view: "Unified",
      relatedPois: "off",
    };
  }

  public async searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationTomTomModelType[]> {
    if (!this.logger) throw new Error(QuickRouteProviderErrors.MISSING_LOGGER);
    if (!this.cache) throw new Error(QuickRouteProviderErrors.MISSING_CACHE);
    const cached = await this.cache.getByPartialAddress<LocationTomTomModelType>("TomTom", params);
    if (cached) return cached;
    // REQUEST
    const query = encodeURIComponent(params.query.trim());
    if (!query || query.length === 0) throw new Error(QuickRouteProviderErrors.MISSING_SEARCH_QUERY);
    const url = this.api.apiUrl;
    const endpoint = `/search/2/search/${query}.json`;
    const args = new URLSearchParams({ ...this.config, key: this.api.apiKey });
    const request = await fetch(`${url}${endpoint}?${args.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": params.tracking?.client || "",
        "X-Correlation-Id": params.tracking?.correlation || "",
        "X-Conversation-Id": params.tracking?.conversation || "",
      },
    });
    const response = (await request.json()) as QuickRouteProviderTomTomResponse;
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
    await this.cache.setForPartialAddress<LocationTomTomModelType>("TomTom", params, results);
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
