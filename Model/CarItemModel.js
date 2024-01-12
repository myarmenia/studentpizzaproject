import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    type: { type: [Number] },
    size: { type: [Number] },
    count: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
