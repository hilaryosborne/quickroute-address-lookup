import { QuickRouteProviders } from ".";
import QuickRouteProviderI from "./provider.interface";

type QuickRouteProviderTomTomOptions = {
  apiKey: string;
  limits?: { maxRequests: number; per: "second" | "minute" | "hour" | "day" };
};

class QuickRouteProviderTomTom implements QuickRouteProviderI {
  public code = QuickRouteProviders.TomTom;
  constructor(options?: QuickRouteProviderTomTomOptions) {}
}

export default QuickRouteProviderTomTom;
