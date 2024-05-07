import Cart from "../Model/CartModel.js";
import Pizza from "../Model/PizzaModel.js";
import CartItem from "../Model/CarItemModel.js";

const cartService = {
  getAll: async () => {
    const cart = await Cart.find().populate(["pizzaId"]);

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
              console.log("if exists acc => ", acc);
              console.log("if exists item => ", item);
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
              console.log("if new acc => ", acc);
              console.log("if new item => ", item);
              return acc + (newCartItem.count + item.count) * pizza.price;
            }, 0);

            await Promise.all([cart.save(), newCartItem.save()]);
          }
        }
        return { message: "Пицца добавлена ​​в корзину" };
      } else {
        return { message: "You Must Send Type and Size" };
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

  changeCount: async (pizzaId, itemId, count) => {
    const [cartItem, cart, pizza] = await Promise.all([
      CartItem.findOne({ pizzaID: pizzaId }),
      Cart.findOne({ pizzaId }),
      Pizza.findById(pizzaId),
    ]);

    cartItem.subCategories.map(async (el) => {
      if (String(el._id) == itemId.toString()) {
        el.count = count;
      }
    });
    cart.subCategories = cartItem._id;
    cart.totalCount = cartItem.subCategories.reduce((a, b) => {
      return a + b.count;
    }, 0);
    cart.totalPrice = cart.totalCount * pizza.price;

    await Promise.all([cartItem.save(), cart.save()]);

    return { count };
  },

  deleteOne: async (pizzaId, itemId) => {
    if (pizzaId && itemId) {
      const [cart, cartItem, pizza] = await Promise.all([
        Cart.findOne({ pizzaId }).populate(["pizzaId"]),
        CartItem.findOne({ pizzaID: pizzaId }),
        Pizza.findById(pizzaId),
      ]);

      const itemExist = cartItem.subCategories.find(
        (el) => el._id.toString() === itemId
      );
      cartItem.subCategories = cartItem.subCategories.filter(
        (el) => el._id.toString() !== itemId
      );
      cart.subCategories = cartItem.subCategories;
      cart.totalCount = cart.totalCount - itemExist.count;
      cart.totalPrice = cart.totalPrice - itemExist.count * pizza.price;

      await Promise.all([cart.save(), cartItem.save()]);
      return { Message: `Item Has Been Deleted` };
    } else {
      return { Message: `Something Went Wrong ` };
    }
  },

  deletePizza: async (pizzaId) => {
    if (pizzaId) {
      const [cart, cartItem] = await Promise.all([
        Cart.findOneAndDelete({ pizzaId }),
        CartItem.deleteMany({ pizzaID: pizzaId }),
      ]);
      console.log(cart, cartItem);
      if (cart && cartItem) {
        return { message: `Item With _ID ${pizzaId} Removed` };
      } else {
        return { mesage: `Pizza With _ID: ${pizzaId} Not Found` };
      }
    } else {
      return { message: ` Item Whit _ID: ${pizzaId} Was Not Found ` };
    }
  },

  deleteAll: async () => {
    await Promise.all([Cart.deleteMany({}), CartItem.deleteMany({})]);

    return { message: "Корзина очищена" };
  },
};
export default cartService;
