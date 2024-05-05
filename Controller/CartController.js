import { parse } from "dotenv";
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
      const { pizzaId, type, size } = req.body;
      const addToCart = await cartService.addToCart(pizzaId, type, size);
      res.status(201).send(addToCart);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  checkout: async ( req,res)=>{
    try {

      const data = await cartService.checkout()

      res.status(200).send(data)
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  changeCount: async (req, res) => {
    try {
      const { pizzaId, itemId} = req.body;
      const count = parseInt(req.body.count)

      const changeCount = await cartService.changeCount(pizzaId, itemId,count);
      res.status(200).send(changeCount);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  deleteOne: async (req, res) => {
    try {
      const {pizzaId, itemId } = req.body;
      const deleteOne = await cartService.deleteOne(pizzaId, itemId );
      res.json(deleteOne);
    } catch (error) {
      console.error(error);
      res.status(500).json({ CriticalError: "Internal Server Error" });
    }
  },

  deletePizza: async (req, res) => {
    try {
      const { pizzaId } = req.body;
      const deletePizza = await cartService.deletePizza(pizzaId);
      res.status(201).send(deletePizza);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: " Internal Server Error " });
    }
  },

  deleteAll: async (req, res) => {
    try {
      const deleteAll = await cartService.deleteAll();
      res.status(201).send(deleteAll);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: "Internal Server Error" });
    }
  },
};

export default cartController;
