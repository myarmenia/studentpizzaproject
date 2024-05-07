import mongoose from "mongoose";


const cartSchema = new mongoose.Schema(
  {
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    subCategory: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
      },
    
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
    path: "subCategory",
    select: { "subCategories": 1, "_id": 0 } 
  });
  next();
});

cartSchema.pre("find", function (next) {
  this.populate({
    path: "subCategory",
    select: { "subCategories": 1, "_id": 0 } 
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
