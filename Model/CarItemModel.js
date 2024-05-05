import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    pizzaID : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    subCategories :[ 
      {
        type: { type: Number },
        size: { type: Number},
        count: { type: Number, default: 1 },
      }
  ]
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
