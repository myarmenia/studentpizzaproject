import pizzaService from "../Service/PizzaService.js";

const pizzaController = {
  getAll: async (req, res) => {
    try {
      const { sort, order, filter } = req.query;

      const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
      const size = parseInt(req.query.size) ? parseInt(req.query.size) : 4;

      const pizzas = await pizzaService.getAll(sort, order, filter, page, size);

      res.status(200).send(pizzas);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  searchPizza: async (req, res) => {
    try {
        const value = req.query.value

        const data = await pizzaService.searchData(value)

        res.status(200).send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Interal Server Error" })
    }
  },
  getByID: async (req, res) => {
    try {
        const id = req.params.id

        const data = await pizzaService.getByID(id)

        res.status(200).send(data)

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Interal Server Error" })
    }
  },
};

export default pizzaController;
