import LocationTomTomModel from "../location.tomtom.model";

describe("tomtom location model", () => {
  it("should create a valid tomtom location model", () => {
    const data = LocationTomTomModel.parse({
      id: "47-dan-street-graceville-qld-4075",
      address: {
        display: "47 Dan Street, Graceville, QLD, 4075",
        street: { number: "47", name: "Dan Street", type: "point-address" },
        suburb: "Graceville",
        city: "Brisbane",
        state: { name: "Queensland", code: "QLD" },
        postcode: "4075",
        country: { name: "Australia", code: "AU" },
      },
      geo: { lat: -27.52455, lng: 152.979633 },
      provider: {
        type: "TomTom",
        id: "seZAH0n_SjnnRNj3Iy_0Xg",
        score: 10.6261100769,
        viewport: {
          topLeftPoint: { lat: -27.52365, lng: 152.97862 },
          btmRightPoint: { lat: -27.52545, lng: 152.98065 },
        },
      },
    });
    expect(data).toMatchObject({
      id: "47-dan-street-graceville-qld-4075",
      address: {
        display: "47 Dan Street, Graceville, QLD, 4075",
        street: { number: "47", name: "Dan Street", type: "point-address" },
        suburb: "Graceville",
        city: "Brisbane",
        state: { name: "Queensland", code: "QLD" },
        postcode: "4075",
        country: { name: "Australia", code: "AU" },
      },
      geo: { lat: -27.52455, lng: 152.979633 },
      provider: {
        type: "TomTom",
        id: "seZAH0n_SjnnRNj3Iy_0Xg",
        score: 10.6261100769,
        viewport: {
          topLeftPoint: { lat: -27.52365, lng: 152.97862 },
          btmRightPoint: { lat: -27.52545, lng: 152.98065 },
        },
      },
    });
  });
});
