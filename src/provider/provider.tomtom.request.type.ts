import z, { number, object, string } from "zod";

export const ProviderTomTomFuzzySearchParams = object({
  typeahead: z.enum(["true", "false"]).optional().default("true"),
  limit: number().min(1).max(100).optional().default(10),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  radius: number().min(1).max(100000).optional(),
  minFuzzyLevel: z.number().min(1).max(4).optional().default(1),
  maxFuzzyLevel: z.number().min(1).max(4).optional().default(2),
});

export type ProviderTomTomFuzzySearchParamsType = z.infer<typeof ProviderTomTomFuzzySearchParams>;

export const ProviderTomTomFuzzySearchRequest = ProviderTomTomFuzzySearchParams.extend({
  countrySet: z.enum(["AU"]).optional().default("AU"),
  mapcodes: z.enum(["Local"]).optional().default("Local"),
  idxSet: z.enum(["PAD,Addr"]).optional().default("PAD,Addr"),
  geobias: string().optional(),
  view: z.enum(["Unified"]).optional().default("Unified"),
  relatedPois: z.enum(["off", "on"]).optional().default("off"),
  key: string().min(1).trim(),
}).transform((data) => Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined)));

export type ProviderTomTomFuzzySearchRequestType = z.infer<typeof ProviderTomTomFuzzySearchRequest>;
