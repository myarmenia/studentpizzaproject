import pizzaService from "../Service/PizzaService.js";

const pizzaController = {
  getAll: async (req, res) => {
    try {
      const { sort, order, filter } = req.query;

      const page = parseInt(req.query.page) || 1
      const size = parseInt(req.query.size) || 10


      const pizzas = await pizzaService.getAll(sort, order, filter,page,size);

      res.status(200).send(pizzas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default pizzaController;
