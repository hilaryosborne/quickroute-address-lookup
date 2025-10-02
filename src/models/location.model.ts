import z, { object } from "zod";

const LocationModel = object({});

export type LocationModelType = z.infer<typeof LocationModel>;

export default LocationModel;
