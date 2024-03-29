import cartService from "../Service/CartService.js";
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
      const { pizzaId, type, size } = req.body;
      const addToCart = await cartService.addToCart(pizzaId, type, size);
      res.status(201).send(addToCart);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  changeCount: async (req, res) => {
    try {
      const { _id, count } = req.body;
      const changeCount = await cartService.changeCount(_id, count);
      res.status(200).send(changeCount);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const { _id } = req.body;
      console.log(_id);
      const deleteOne = await cartService.deleteOne(_id);
      res.json(deleteOne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ CriticalError: "Internal Server Error" });
    }
  },

  deletePizza: async (req, res) => {
    try {
      const { _id } = req.body;
      console.log(_id);
      const deletePizza = await cartService.deletePizza(_id);
      res.status(201).send(deletePizza);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  deleteAll: async (req, res) => {
    try {
      console.log("alll");
      const deleteAll = await cartService.deleteAll();
      res.status(201).send(deleteAll);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: "Internal Server Error" });
    }
  },
};

export default cartController;
