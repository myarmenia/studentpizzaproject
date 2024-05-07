import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
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

cartSchema.pre("findOne", function (next) {
  this.populate({
    path: "subCategories",
    select: { type: 1, size: 1, count: 1, _id: 1 },
  });
  next();
});

cartSchema.pre("find", function (next) {
  this.populate({
    path: "subCategories",
    select: { type: 1, size: 1, count: 1, _id: 1 },
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
