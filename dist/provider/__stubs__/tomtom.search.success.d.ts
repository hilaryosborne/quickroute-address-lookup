declare const _default: {
    summary: {
        query: string;
        queryType: string;
        queryTime: number;
        numResults: number;
        offset: number;
        totalResults: number;
        fuzzyLevel: number;
        queryIntent: never[];
    };
    results: ({
        type: string;
        id: string;
        score: number;
        address: {
            streetNumber: string;
            streetName: string;
            municipalitySubdivision: string;
            municipality: string;
            countrySecondarySubdivision: string;
            countrySubdivision: string;
            countrySubdivisionName: string;
            countrySubdivisionCode: string;
            postalCode: string;
            countryCode: string;
            country: string;
            countryCodeISO3: string;
            freeformAddress: string;
            localName: string;
        };
        position: {
            lat: number;
            lon: number;
        };
        viewport: {
            topLeftPoint: {
                lat: number;
                lon: number;
            };
            btmRightPoint: {
                lat: number;
                lon: number;
            };
        };
        addressRanges: {
            rangeLeft: string;
            from: {
                lat: number;
                lon: number;
            };
            to: {
                lat: number;
                lon: number;
            };
        };
    } | {
        type: string;
        id: string;
        score: number;
        address: {
            streetName: string;
            municipality: string;
            countrySecondarySubdivision: string;
            countrySubdivision: string;
            countrySubdivisionName: string;
            countrySubdivisionCode: string;
            countryCode: string;
            country: string;
            countryCodeISO3: string;
            freeformAddress: string;
            localName: string;
            streetNumber?: undefined;
            municipalitySubdivision?: undefined;
            postalCode?: undefined;
        };
        position: {
            lat: number;
            lon: number;
        };
        viewport: {
            topLeftPoint: {
                lat: number;
                lon: number;
            };
            btmRightPoint: {
                lat: number;
                lon: number;
            };
        };
        addressRanges?: undefined;
    } | {
        type: string;
        id: string;
        score: number;
        address: {
            streetName: string;
            municipalitySubdivision: string;
            municipality: string;
            countrySecondarySubdivision: string;
            countrySubdivision: string;
            countrySubdivisionName: string;
            countrySubdivisionCode: string;
            postalCode: string;
            countryCode: string;
            country: string;
            countryCodeISO3: string;
            freeformAddress: string;
            localName: string;
            streetNumber?: undefined;
        };
        position: {
            lat: number;
            lon: number;
        };
        viewport: {
            topLeftPoint: {
                lat: number;
                lon: number;
            };
            btmRightPoint: {
                lat: number;
                lon: number;
            };
        };
        addressRanges?: undefined;
    } | {
        type: string;
        id: string;
        score: number;
        address: {
            streetName: string;
            municipality: string;
            countrySecondarySubdivision: string;
            countrySubdivision: string;
            countrySubdivisionName: string;
            countrySubdivisionCode: string;
            postalCode: string;
            countryCode: string;
            country: string;
            countryCodeISO3: string;
            freeformAddress: string;
            localName: string;
            streetNumber?: undefined;
            municipalitySubdivision?: undefined;
        };
        position: {
            lat: number;
            lon: number;
        };
        viewport: {
            topLeftPoint: {
                lat: number;
                lon: number;
            };
            btmRightPoint: {
                lat: number;
                lon: number;
            };
        };
        addressRanges?: undefined;
    })[];
};
export default _default;
//# sourceMappingURL=tomtom.search.success.d.ts.map