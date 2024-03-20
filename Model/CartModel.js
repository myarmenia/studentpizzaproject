import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
      }
    ],
    totalPrice: {
      type: Number, 
      required:true
    },
    totalCount: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
