import mongoose from "mongoose";
// mongoose.Schema.Types.ObjectId
const pizzaSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    types: { type: [Number], enum: [[0, 1]], required: true },
    sizes: { type: [Number], required: true },
    price: { type: Number, required: true },
    category: { type: Number, required: true },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
