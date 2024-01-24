import Pizza from "../Model/PizzaModel.js";

const pizzaService = {
  getAll: async (sort, order, filter) => {
    console.log("a");
    const pizzas = await Pizza.find();

    if (sort) {
      if (sort === "price") {
        if (order) {
          if (order === "asc") {
            pizzas.sort((a, b) => a.price - b.price);
          }
          if (order === "desc") {
            pizzas.sort((a, b) => b.price - a.price);
          }
        } else {
          pizzas.sort((a, b) => a.price - b.price);
        }
      }

      if (sort === "alp") {
        pizzas.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sort === "rating") {
        if (order) {
          if (order === "asc") {
            pizzas.sort((a, b) => a.rating - b.rating);
          }
          if (order === "desc") {
            pizzas.sort((a, b) => b.rating - a.rating);
          }
        } else {
          pizzas.sort((a, b) => a.rating - b.rating);
        }
      }
    } else {
      if (filter) {
        return pizzas.filter((pizza) => pizza.category === parseInt(filter));
      }
    }

    return pizzas;
  },
};

export default pizzaService;
