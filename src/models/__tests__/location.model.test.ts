import LocationModel from "../location.model";

describe("universal location model", () => {
  it("should create a valid location model", () => {
    const data = LocationModel.parse({
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
        raw: "provider specific data",
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
        raw: "provider specific data",
      },
    });
  });
});
