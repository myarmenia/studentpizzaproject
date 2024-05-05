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
      if(type && size){
        if (!cart) {
            const newCartItem = new CartItem({
              pizzaID : pizzaId,
              subCategories: [
                {
                  type,
                  size,
                }
              ]
            });
          const newCart = new Cart({
            pizzaId,
            totalPrice: pizza.price,
            subCategory : newCartItem.subCategories
          });

          await Promise.all([newCart.save(), newCartItem.save()]);
        } else {

          const isCartItem = await CartItem.findOne({pizzaID:pizzaId})

          const itemExist = isCartItem.subCategories.filter((el)=> el.type === parseInt(type) && el.size === parseInt(size))

          if(!itemExist.length){
            isCartItem.subCategories.push({
              type,
              size
            })

            cart.totalCount = cart.totalCount + 1
            cart.totalPrice = cart.totalPrice + pizza.price
            cart.subCategory = isCartItem.subCategories

            await Promise.all([isCartItem.save(), cart.save()])
          }else{

            isCartItem.subCategories.map((el)=>{
              if(el.type === parseInt(type) && el.size === parseInt(size)){
                el.count = el.count + 1
                
              }
            })

            cart.totalCount = cart.totalCount + 1
            cart.totalPrice = cart.totalPrice + pizza.price
            cart.subCategory = isCartItem.subCategories

            await Promise.all([isCartItem.save(), cart.save()])

          }

        }
      }else{
        return {message: "You Must Send Type and Size"}
      }
    }else{
      return {message: `Pizza With ID ${pizzaId} Not Found`}
    }
  },

  checkout : async ()=>{
    const [deleteAllCart, deleteAllCartItem] = await Promise.all([Cart.deleteMany({}), CartItem.deleteMany({})])
    return { message: "All Pizzas Were Bought" };
  },

  changeCount: async (pizzaId, itemId, count,) => {
    const [cartItem, cart , pizza] = await Promise.all([CartItem.findOne({pizzaID: pizzaId}), Cart.findOne({pizzaId}), Pizza.findById(pizzaId)])


    cartItem.subCategories.map(async (el)=>{
      if(String(el._id) == itemId.toString()){
        const elOldCount = el.count
        const elOldPrice = el.count * pizza.price
        el.count = count
        cart.totalCount = cart.totalCount - elOldCount + count
        cart.totalPrice = cart.totalPrice - elOldPrice  + (count * pizza.price)
        cart.subCategory = cartItem.subCategories
      }
   
    })
    await Promise.all([cartItem.save(), cart.save()])
  },

  deleteOne: async (pizzaId, itemId ) => {
    if (pizzaId && itemId) {
      const [cart, cartItem,pizza] = await Promise.all([
        Cart.findOne({pizzaId}).populate(["pizzaId"]),
        CartItem.findOne({pizzaID: pizzaId}),
        Pizza.findById(pizzaId)
      ]);

      const itemExist = cartItem.subCategories.find((el)=> el._id.toString() === itemId)
      cartItem.subCategories = cartItem.subCategories.filter((el)=> el._id.toString() !== itemId)
      cart.subCategory = cartItem.subCategories
      cart.totalCount = cart.totalCount - itemExist.count
      cart.totalPrice = cart.totalPrice - (itemExist.count * pizza.price)


      await Promise.all([cart.save(), cartItem.save()])
      return { Message: `Item Has Been Deleted` };
    } else {
      return { Message: `Something Went Wrong ` };
    }
  },

  deletePizza: async (pizzaId) => {
    if (pizzaId) {
      const [cart, cartItem] = await Promise.all([
        Cart.findOneAndDelete({pizzaId}),
        CartItem.findOneAndDelete({pizzaID:pizzaId}),
      ]);

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
    const [deleteAllCart, deleteAllCartItem] = await Promise.all([Cart.deleteMany({}), CartItem.deleteMany({})])
    return { message: "Cart Has Been Cleared" };
  },
};
export default cartService;
