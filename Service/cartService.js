import Cart from "../Model/CartModel.js";
import Pizza from "../Model/PizzaModel.js";

const cartService = {
  getAll: async () => {
    const cart = await Cart.find().populate("pizzaId");
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
  addToCart: async (pizzaId) => {
    const pizza = await Pizza.findById(pizzaId);
    const cart = await Cart.findOne({ pizzaId: pizzaId });

    if (pizza && !cart) {
      const newItem = new Cart({
        pizzaId: pizza._id,
      }).save();

      if (!newItem) {
        return { message: `${pizza.title} не удалось добавить в корзину` };
      }
      return { message: `${pizza.title} добавлен в корзину` };
    } else {
      console.log("++++++++");
      cart.count = cart.count + 1;
      console.log(cart);
      await cart.save();
      return { message: `${pizza.title} добавлен в корзину` };
    }
  },

  changeCount: async (pizzaId, type) => {
    const cart = await Cart.findOne({ pizzaId: pizzaId });
    console.log(cart);
    if (type === "add") {
      cart.count = cart.count + 1;
    }

    if (type === "decrement") {
      if (cart.count > 1) {
        cart.count = cart.count - 1;
      } else if (cart.count <= 1) {
        return {
          message: "Вы не можете удалить пиццу потому что в корзине 1 товар",
        };
      }
    }
    await cart.save();
  },

  deleteOne: async (pizzaId) => {
    if (pizzaId) {
      const deleteOne = await Cart.findOneAndDelete({ pizzaId: pizzaId });
      return { message: `Item With _ID ${pizzaId} Removed` };
    } else {
      return { message: ` Item Whit _ID:${pizzaId} Was Not Found ` };
    }
  },

  deleteAll: async () => {
    const deleteAll = await Cart.deleteMany({});
    return { message: "Cart Has Been Cleared" };
  },
};
export default cartService;
