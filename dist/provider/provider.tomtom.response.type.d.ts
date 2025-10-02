export type ProviderTomTomSearchResponseResult = {
    type: string;
    id: string;
    score: number;
    dist?: number;
    info?: string;
    poi?: {
        name: string;
        phone?: string;
        brands?: Array<{
            name: string;
        }>;
        categorySet?: Array<{
            id: number;
        }>;
        categories?: string[];
        classifications?: Array<{
            code: string;
            names: Array<{
                nameLocale: string;
                name: string;
            }>;
        }>;
        openingHours?: {
            mode: string;
            timeRanges?: Array<{
                startTime: {
                    date: string;
                    hour: number;
                    minute: number;
                };
                endTime: {
                    date: string;
                    hour: number;
                    minute: number;
                };
            }>;
        };
        url?: string;
    };
    address: {
        streetNumber?: string;
        streetName?: string;
        municipalitySubdivision?: string;
        municipality?: string;
        countrySecondarySubdivision?: string;
        countrySubdivision?: string;
        countrySubdivisionName?: string;
        countrySubdivisionCode?: string;
        postalCode?: string;
        extendedPostalCode?: string;
        countryCode?: string;
        country?: string;
        countryCodeISO3?: string;
        freeformAddress?: string;
        localName?: string;
        crossStreet?: string;
        routeNumbers?: string[];
    };
    position: {
        lat: number;
        lon: number;
    };
    viewport?: {
        topLeftPoint: {
            lat: number;
            lon: number;
        };
        btmRightPoint: {
            lat: number;
            lon: number;
        };
    };
    entryPoints?: Array<{
        type: string;
        position: {
            lat: number;
            lon: number;
        };
    }>;
    addressRanges?: {
        rangeLeft?: string;
        rangeRight?: string;
        from: {
            lat: number;
            lon: number;
        };
        to: {
            lat: number;
            lon: number;
        };
    };
    chargingPark?: {
        connectors?: Array<{
            connectorType: string;
            ratedPowerKW?: number;
            currentA?: number;
            currentType?: string;
            voltageV?: number;
        }>;
    };
    dataSources?: {
        geometry?: {
            id: string;
        };
    };
    entityType?: string;
    matchConfidence?: {
        score: number;
    };
};
type ProviderTomTomSearchResponse = {
    summary: {
        query: string;
        queryType: string;
        queryTime: number;
        numResults: number;
        offset: number;
        totalResults: number;
        fuzzyLevel: number;
        geoBias?: {
            lat: number;
            lon: number;
        };
    };
    results: ProviderTomTomSearchResponseResult[];
};
export default ProviderTomTomSearchResponse;
//# sourceMappingURL=provider.tomtom.response.type.d.ts.map