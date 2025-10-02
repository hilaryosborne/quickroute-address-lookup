import z from "zod";
declare const AddressModel: z.ZodObject<{}, z.core.$strip>;
export type AddressModelType = z.infer<typeof AddressModel>;
export default AddressModel;
//# sourceMappingURL=address.model.d.ts.map