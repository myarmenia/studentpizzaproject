import pizzaService from "../Service/PizzaService.js";

const pizzaController = {
  getAll: async (req, res) => {
    try {
      const { sort, order, filter, search } = req.query;

      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

      const pizzas = await pizzaService.getAll(
        sort,
        order,
        filter,
        search,
        page,
        size
      );

      res.status(200).send(pizzas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getByID: async (req, res) => {
    try {
      const id = req.params.id;

      const data = await pizzaService.getByID(id);

      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Interal Server Error" });
    }
  },
};

export default pizzaController;
