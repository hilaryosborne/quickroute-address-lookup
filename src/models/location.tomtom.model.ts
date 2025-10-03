import z from "zod";
import LocationModel from "./location.model";

const LocationTomTomModel = LocationModel.extend({
  // tomtom specific vendor information
  provider: z
    .object({
      type: z.literal("TomTom"),
      id: z.string().optional(),
      score: z.number().optional(),
      viewport: z
        .object({
          topLeftPoint: z.object({
            lat: z.number().optional(),
            lng: z.number().optional(),
          }),
          btmRightPoint: z.object({
            lat: z.number().optional(),
            lng: z.number().optional(),
          }),
        })
        .optional(),
    })
    .optional(),
});

export type LocationTomTomModelType = z.infer<typeof LocationTomTomModel>;

export default LocationTomTomModel;
