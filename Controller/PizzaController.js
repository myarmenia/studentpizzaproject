import pizzaService from "../Service/PizzaService.js";

const pizzaController = {
  getAll: async (req, res) => {
    try {
      const { sort, order, filter } = req.query;

      const pizzas = await pizzaService.getAll(sort, order, filter);

      res.status(200).send(pizzas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default pizzaController;
