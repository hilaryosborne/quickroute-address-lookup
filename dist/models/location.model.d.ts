import z from "zod";
declare const LocationModel: z.ZodObject<{
    address: z.ZodOptional<z.ZodObject<{
        display: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodObject<{
            number: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        suburb: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            code: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        postcode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            code: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    geo: z.ZodOptional<z.ZodObject<{
        lat: z.ZodOptional<z.ZodNumber>;
        lng: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    provider: z.ZodOptional<z.ZodUnknown>;
}, z.core.$strip>;
export type LocationModelType = z.infer<typeof LocationModel>;
export default LocationModel;
//# sourceMappingURL=location.model.d.ts.map