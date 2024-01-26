import Cart from "../Model/CartModel.js";
import Pizza from "../Model/PizzaModel.js";
import CartItem from "../Model/CarItemModel.js";

const cartService = {
  getAll: async () => {
    const cart = await Cart.find().populate(["pizzaId", "subCategory"]);
    if (cart) {
      if (cart.length !== 0) {
        return cart;
      } else {
        return {
          message: "Корзина пустая",
          description:
            "Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на главную страницу.",
        };
      }
    } else {
      return { message: "Cart Is Not Found" };
    }
  },

  addToCart: async (pizzaId, type, size) => {
    const [pizza, cart] = await Promise.all([
      Pizza.findById(pizzaId),
      Cart.findOne({ pizzaId: pizzaId }),
    ]);
    if (pizza) {
      if (!cart) {
        const newCart = new Cart({
          pizzaId,
          totalPrice: pizza.price,
        });
        const newCartItem = new CartItem({
          type,
          size,
        });
        newCart.subCategory.push(newCartItem._id);

        await Promise.all([newCart.save(), newCartItem.save()]);
      } else {
        const itemExist = await CartItem.findOne({
          type: { $eq: type },
          size: { $eq: size },
        });
        if (itemExist) {
          itemExist.count = itemExist.count + 1;
          cart.totalPrice = cart.totalPrice + pizza.price;
          await Promise.all([itemExist.save(), cart.save()]);
        } else {
          const newCartItem = new CartItem({
            type,
            size,
          });
          cart.subCategory.push(newCartItem._id);
          cart.count = cart.count + 1;
          cart.totalPrice = cart.totalPrice + pizza.price;
          await Promise.all([newCartItem.save(), cart.save()]);
        }
      }
    }
  },

  changeCount: async (id, count) => {
    const cartItem = await CartItem.findById(id);
    cartItem.count = count;
    await cartItem.save();
  },

  deleteOne: async (id) => {
    if (id) {
      const [deleteOne, deleteSub] = await Promise.all([
        CartItem.findByIdAndDelete(id),
        Cart.findOne({ subCategory: id }),
      ]);
      if (deleteSub) {
        deleteSub.subCategory.pull(id);
        await deleteSub.save();
      }
      return { Message: `Item Has Been Deleted` };
    } else {
      return { Message: `Something Went Wrong ` };
    }
  },

  deletePizza: async (id) => {
    if (id) {
      const deleteOne = await Cart.findByIdAndDelete(id);
      console.log(deleteOne);
      return { message: `Item With _ID ${id} Removed` };
    } else {
      return { message: ` Item Whit _ID:${id} Was Not Found ` };
    }
  },

  deleteAll: async () => {
    const deleteAll = await Cart.deleteMany({});
    return { message: "Cart Has Been Cleared" };
  },
};
export default cartService;
