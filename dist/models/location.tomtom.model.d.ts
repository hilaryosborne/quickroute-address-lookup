import z from "zod";
declare const LocationTomTomModel: z.ZodObject<{
    address: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
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
    provider: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"TomTom">;
        id: z.ZodOptional<z.ZodString>;
        score: z.ZodOptional<z.ZodNumber>;
        viewport: z.ZodOptional<z.ZodObject<{
            topLeftPoint: z.ZodObject<{
                lat: z.ZodOptional<z.ZodNumber>;
                lng: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>;
            btmRightPoint: z.ZodObject<{
                lat: z.ZodOptional<z.ZodNumber>;
                lng: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type LocationTomTomModelType = z.infer<typeof LocationTomTomModel>;
export default LocationTomTomModel;
//# sourceMappingURL=location.tomtom.model.d.ts.map