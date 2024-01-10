import mongoose from "mongoose";
// mongoose.Schema.Types.ObjectId
const pizzaSchema = new mongoose.Schema(
  {
    imageUrl: { type: String },
    title: { type: String },
    types: { type: [Number], enum: [[0, 1]] },
    sizes: { type: [Number] },
    price: { type: Number },
    category: { type: Number },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
