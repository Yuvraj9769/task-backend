import { Schema, model } from "mongoose";

const catererSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Caterer name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
      index: true,
    },


    //Aded this field to prevent duplicate caterers to store in db.
    
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      index: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 100,
      index: true,
    },

    pricePerPlate: {
      type: Number,
      required: [true, "Price per plate is required"],
      min: [0, "Price cannot be negative"],
      index: true,
    },

    cuisines: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: "At least one cuisine is required",
      },
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for searching
catererSchema.index({
  name: 1,
  location: 1,
  cuisines: 1,
});

// Index for search & sorting
catererSchema.index({ rating: -1 });
catererSchema.index({ pricePerPlate: 1 });

export const Caterer = model("Caterer", catererSchema);