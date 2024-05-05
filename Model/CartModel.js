import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    subCategory:[ 
      {
        type: { type: Number },
        size: { type: Number },
        count: { type: Number, default: 1 },
      }
  ],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalCount: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
