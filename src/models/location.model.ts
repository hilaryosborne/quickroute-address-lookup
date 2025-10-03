import z, { object } from "zod";

// This is the universal location model used for all providers
// each provider will have it's own eccentricities and will be mapped to this model
// the goal is to provide a consistent model while allowing for provider specific data to be included

const LocationModel = object({
  id: z.string().optional(),
  address: object({
    display: z.string().optional(),
    street: object({
      number: z.string().optional(),
      name: z.string().optional(),
      type: z.string().optional(),
    }).optional(),
    suburb: z.string().optional(),
    city: z.string().optional(),
    state: object({
      name: z.string().optional(),
      code: z.string().optional(),
    }).optional(),
    postcode: z.string().optional(),
    country: object({
      name: z.string().optional(),
      code: z.string().optional(),
    }).optional(),
  }).optional(),
  geo: object({
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
  // provider specific data can be added here
  // this allows for consumers to access the raw provider data if needed
  // this also helps if we onboard a new provider and the consumers are willing to work with the raw data
  // here be dragons though, use with caution
  provider: z.unknown().optional(),
});

export type LocationModelType = z.infer<typeof LocationModel>;

export default LocationModel;
