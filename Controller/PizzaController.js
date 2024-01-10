import pizzaService from "../Service/pizzaService.js";

const pizzaController = {
  getAll: async (req, res) => {
    try {
      const { sort, type, filter } = req.query;

      const pizzas = await pizzaService.getAll(sort, type, filter);

      res.status(200).send(pizzas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default pizzaController;
