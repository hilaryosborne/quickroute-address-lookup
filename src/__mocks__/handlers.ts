import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://api.example.com/helloWorld", ({ params }) => {
    return HttpResponse.json({ message: "Hello, World!" });
  }),
  http.get("http://api.example.com/notFound", ({ params }) => {
    return new HttpResponse(null, { status: 404 });
  }),

  http.get("https://api.tomtom.com/search/2/search/:file", ({ params }) => {
    return HttpResponse.json({
      summary: {
        query: "47 dan street",
        queryType: "NON_NEAR",
        queryTime: 63,
        numResults: 15,
        offset: 0,
        totalResults: 17,
        fuzzyLevel: 1,
        queryIntent: [],
      },
      results: [
        {
          type: "Address Range",
          id: "Y_PolFfdmAW2tCbG2wXD8Q",
          score: 6.2542853355,
          address: {
            streetNumber: "47",
            streetName: "Magga Dan Avenue",
            municipalitySubdivision: "Tregear",
            municipality: "Sydney",
            countrySecondarySubdivision: "Sydney",
            countrySubdivision: "New South Wales",
            countrySubdivisionName: "New South Wales",
            countrySubdivisionCode: "NSW",
            postalCode: "2770",
            countryCode: "AU",
            country: "Australia",
            countryCodeISO3: "AUS",
            freeformAddress: "47 Magga Dan Avenue, Tregear, NSW, 2770",
            localName: "Tregear",
          },
          position: {
            lat: -33.744646,
            lon: 150.79299,
          },
          viewport: {
            topLeftPoint: {
              lat: -33.74448,
              lon: 150.79282,
            },
            btmRightPoint: {
              lat: -33.74467,
              lon: 150.79294,
            },
          },
          addressRanges: {
            rangeLeft: "43 - 47",
            from: {
              lat: -33.74448,
              lon: 150.79281,
            },
            to: {
              lat: -33.74467,
              lon: 150.79294,
            },
          },
        },
      ],
    });
  }),
];
