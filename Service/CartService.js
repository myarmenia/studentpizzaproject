import Cart from "../Model/CartModel.js";
import Pizza from "../Model/PizzaModel.js";
import CartItem from "../Model/CarItemModel.js";
import { Types } from "mongoose";

const cartService = {
  getAll: async () => {
    const cart = await Cart.find();

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
    console.log("req.body service =>", pizzaId, type, size);
    if (!pizzaId || !type || !size) return { mesage: `Поля не предоставлены` };

    if (!Types.ObjectId.isValid(pizzaId))
      return {
        mesage: `Предоставленный ID не соответствует правильному синтаксису ID.`,
      };

    const [pizza, cart] = await Promise.all([
      Pizza.findById(pizzaId),
      Cart.findOne({ pizzaId: pizzaId }),
    ]);

    if (pizza) {
      if (type && size) {
        if (!cart) {
          const newCartItem = new CartItem({
            pizzaID: pizza._id,
            type,
            size,
          });
          const newCart = new Cart({
            pizzaId: pizza._id,
            totalPrice: pizza.price,
            subCategories: [newCartItem._id],
          });

          await Promise.all([newCart.save(), newCartItem.save()]);
        } else {
          const isCartItem = await CartItem.find({ pizzaID: pizzaId });
          const ifCriteriasExist = isCartItem.find(
            (el) => el.type === parseInt(type) && el.size === parseInt(size)
          );

          if (ifCriteriasExist) {
            ifCriteriasExist.count = ifCriteriasExist.count + 1;

            cart.totalPrice = isCartItem.reduce((acc, item) => {
              return acc + item.count * pizza.price;
            }, 0);

            await Promise.all([ifCriteriasExist.save(), cart.save()]);
          } else {
            const newCartItem = new CartItem({
              pizzaID: pizza._id,
              type,
              size,
            });

            cart.subCategories.push(newCartItem._id);

            cart.totalCount = cart.subCategories.length;

            cart.totalPrice = isCartItem.reduce((acc, item) => {
              return acc + (newCartItem.count + item.count) * pizza.price;
            }, 0);

            await Promise.all([cart.save(), newCartItem.save()]);
          }
        }
        return { message: "Пицца добавлена ​​в корзину" };
      } else {
        return { mesage: `Поля pizzaId или type или size не предоставлены` };
      }
    } else {
      return {
        message: `Пицца с ID ${pizzaId} не найдена или ID не совпадает`,
      };
    }
  },

  checkout: async () => {
    await Promise.all([Cart.deleteMany({}), CartItem.deleteMany({})]);

    return { message: "Ваша покупка удалась" };
  },

  changeCount: async (itemId, count) => {
    if (!itemId || !count) return { mesage: `Поля не предоставлены` };

    if (!Types.ObjectId.isValid(itemId))
      return {
        mesage: `Предоставленный ID не соответствует правильному синтаксису ID.`,
      };

    const [cartItem, cart] = await Promise.all([
      CartItem.findById(itemId),
      Cart.findOne({ subCategories: itemId }),
    ]);

    if (!cartItem || !cart)
      return {
        mesage: `Неверный ID. Убедитесь, что предоставленный ID действителен.`,
      };

    cartItem.count = count;

    const updatedSubCategories = cart.subCategories.map((item, i) => {
      if (item._id.toString() === itemId) {
        item.count = count;
        return item;
      }
      return item;
    });

    cart.totalPrice = updatedSubCategories.reduce((acc, item) => {
      return acc + item.count * cart.pizzaId.price;
    }, 0);

    await Promise.all([cartItem.save(), cart.save()]);

    return { itemId: cartItem._id, count };
  },

  deleteOne: async (itemId) => {
    if (!itemId)
      return {
        mesage: `Поле не предоставлено.`,
      };

    if (!Types.ObjectId.isValid(itemId))
      return {
        mesage: `Предоставленный ID не соответствует правильному синтаксису ID.`,
      };

    const cart = await Cart.findOne({ subCategories: itemId });

    if (!cart)
      return {
        mesage: `Неверный ID. Убедитесь, что предоставленный ID действителен.`,
      };

    const updatedSubCategories = cart.subCategories.filter(
      (item) => item._id.toString() !== itemId
    );

    cart.subCategories = updatedSubCategories;
    cart.totalCount = cart.subCategories.length;

    cart.totalPrice = cart.subCategories.reduce((acc, item) => {
      return acc + item.count * cart.pizzaId.price;
    }, 0);

    await Promise.all([cart.save(), CartItem.deleteOne({ _id: itemId })]);

    return { message: `Элемент был удален` };
  },

  deletePizza: async (pizzaId) => {
    if (!pizzaId)
      return {
        mesage: `Поле не предоставлено.`,
      };

    if (!Types.ObjectId.isValid(pizzaId))
      return {
        mesage: `Предоставленный ID не соответствует правильному синтаксису ID.`,
      };

    const [cart, cartItem] = await Promise.all([
      Cart.deleteOne({ pizzaId }),
      CartItem.deleteMany({ pizzaID: pizzaId }),
    ]);

    if (!cartItem || !cart)
      return {
        mesage: `Неверный ID. Убедитесь, что предоставленный ID действителен.`,
      };

    if (
      cart.acknowledged &&
      cart.deletedCount > 0 &&
      cartItem.acknowledged &&
      cartItem.deletedCount > 0
    ) {
      return { message: `Пицца с ID ${pizzaId} удалена` };
    }
  },

  deleteAll: async () => {
    await Promise.all([Cart.deleteMany({}), CartItem.deleteMany({})]);

    return { message: "Корзина очищена" };
  },
};
export default cartService;
