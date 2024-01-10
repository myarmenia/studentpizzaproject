import cartService from "../Service/cartService.js";
const cartController = {
  
  getAll: async (req, res) => {
    try {
      const cart = await cartService.getAll();
      res.status(200).send(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },
  addToCart: async (req, res) => {
    try {
      const { pizzaId } = req.body;
      const addToCart = await cartService.addToCart(pizzaId);
      res.status(201).send(addToCart);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  changeCount: async (req, res) => {
    try {
      const { pizzaId } = req.body;
      const { type } = req.query;
      const changeCount = await cartService.changeCount(pizzaId, type)
      res.status(200).send(changeCount)
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },
  deleteOne: async (req,res) => {
    try {
      const { pizzaId } = req.body
      const deletePizza = await cartService.deleteOne(pizzaId)
      res.status(201).send(deletePizza)
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " })
    }
  },

  deleteAll: async (req,res) => {
    try {
      const deleteAll = await cartService.deleteAll()
      res.status(201).send(deleteAll)
    } catch (error) {
      console.error(error);
      res.status(500).send( { CriticalError: "Internal Server Error" } )
    }
  }
};

export default cartController;
