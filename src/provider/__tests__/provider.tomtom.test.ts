import QuickRouteProviderTomTom from "../provider.tomtom";

describe("provider tomtom", () => {
  it("can instantiate the tom tom provider", async () => {
    const provider = new QuickRouteProviderTomTom();
    expect(provider).toBeInstanceOf(QuickRouteProviderTomTom);
  });
});
