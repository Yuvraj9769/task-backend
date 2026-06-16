import { Request, Response } from "express";
import { ZodError } from "zod";
import { Caterer } from "../models/caterer.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/async-handler";
import {
  createCatererSchema,
  listCaterersQuerySchema,
  type CreateCatererInput,
} from "../validators/caterer.validator";

export const getCaterers = asyncHandler(async (req: Request, res: Response) => {
  
  const { search, minPrice, maxPrice } = listCaterersQuerySchema.parse(req.query);

  const filter: Record<string, unknown> = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const price: Record<string, number> = {};
  
  if (minPrice !== undefined) price.$gte = minPrice;

  if (maxPrice !== undefined) price.$lte = maxPrice;

  if (Object.keys(price)?.length > 0) {
    filter.pricePerPlate = price;
  }

  const caterers = await Caterer.find(filter).sort({
                                rating: -1, updatedAt: -1,
                              }
                            )

  return ApiResponse.success(res, 200, caterers, "Caterers fetched successfully");

});

export const getCatererById = asyncHandler(
  
  async (req: Request, res: Response) => {

    if(!req.params?.id) {
      return ApiResponse.error(res, 400, "Caterer ID is required");
    }

    const caterer = await Caterer.findById(req.params.id);

    if (!caterer) {
      return ApiResponse.error(res, 404, "Caterer not found");
    }

    return ApiResponse.success(res, 200, caterer, "Caterer fetched successfully");
  },
);

export const createCaterer = asyncHandler(
 
  async (req: Request, res: Response) => {
    try {
      const payload = createCatererSchema.parse(req.body);

      //Aded this field to prevent duplicate caterers to store in db.

      const isCatererExists = await Caterer.findOne({ email: payload.email });

      if (isCatererExists) {
        return ApiResponse.error(res, 409, "A caterer with this email already exists");
      }

      const caterer = await Caterer.create(payload);

      return ApiResponse.success(res, 201, caterer, "Caterer created successfully");

    } catch (error) {

      if (error instanceof ZodError) {

        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return ApiResponse.error(res, 400, "Validation failed", errors);
      }

      const message = (error as Error)?.message || "Failed to create caterer";
      return ApiResponse.error(res, 500, message);
    }
  },

);
