import QuickRouteProviderI from "./provider.interface";
import stub from "./__stubs__/tomtom.search.success";
import QuickRouteProviderTomTomResponse, { ProviderTomTomSearchResponseResult } from "./provider.tomtom.response.type";
import LocationTomTomModel, { LocationTomTomModelType } from "../models/location.tomtom.model";
import { SearchByPartialAddressParams } from "../address.lookup";

type QuickRouteProviderTomTomOptions = {
  apiKey: string;
  limits?: { maxRequests: number; per: "second" | "minute" | "hour" | "day" };
};

class QuickRouteProviderTomTom implements QuickRouteProviderI {
  constructor(options?: QuickRouteProviderTomTomOptions) {}
  public async searchByPartialAddress(params: SearchByPartialAddressParams): Promise<LocationTomTomModelType[]> {
    const response = stub as QuickRouteProviderTomTomResponse;
    const results = response.results.map<LocationTomTomModelType>((result) => {
      const mapped: LocationTomTomModelType = {
        provider: params.expands?.indexOf("provider") !== -1 ? this.expandProvider(result) : undefined,
        address: params.expands?.indexOf("address") !== -1 ? this.expandAddress(result) : undefined,
        geo: params.expands?.indexOf("geo") !== -1 ? this.expandGeo(result) : undefined,
      };
      return LocationTomTomModel.parse(mapped);
    });
    // we could trust the order from the provider, but let's be sure
    // assumption: higher score is better so lets show those first
    const ordered = results.sort((a, b) => (b.provider?.score || 0) - (a.provider?.score || 0));
    return ordered;
  }

  protected expandAddress(location: ProviderTomTomSearchResponseResult): LocationTomTomModelType["address"] {
    return {
      display: location.address?.freeformAddress,
      street: {
        number: location.address?.streetNumber,
        name: location.address?.streetName,
        // not sure about this one
        type: location.type,
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
