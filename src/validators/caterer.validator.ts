import { z } from "zod";

export const createCatererSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Invalid email address").toLowerCase(),
  location: z.string().trim().min(1, "Location is required"),
  pricePerPlate: z
    .number({ invalid_type_error: "Price per plate must be a number" })
    .positive("Price per plate must be greater than 0"),
  cuisines: z
    .array(z.string().trim().min(1, "Cuisine cannot be empty"))
    .min(1, "Add at least one cuisine"),
  rating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0, "Rating cannot be below 0")
    .max(5, "Rating cannot be above 5"),
});

export type CreateCatererInput = z.infer<typeof createCatererSchema>;

export const listCaterersQuerySchema = z.object({
  search: z.string().trim().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  sortOrder: z.string().trim().optional()
});

export type ListCaterersQuery = z.infer<typeof listCaterersQuerySchema>;
