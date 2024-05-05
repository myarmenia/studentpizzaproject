import Pizza from "../Model/PizzaModel.js";

const pizzaService = {
  getAll: async (sort, order, filter, page, size) => {
    const pizzas = await Pizza.find();

    const skip = (page - 1) * size;
    const paginatedData = pizzas.slice(skip, skip + size);

    if (pizzas.length > 0) {
      if (sort) {
        if (sort === "price") {
          if (order) {
            if (order === "asc") {
              paginatedData.sort((a, b) => a.price - b.price);
            }
            if (order === "desc") {
              paginatedData.sort((a, b) => b.price - a.price);
            }
          } else {
            paginatedData.sort((a, b) => a.price - b.price);
          }
        }

        if (sort === "alp") {
          paginatedData.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (sort === "rating") {
          if (order) {
            if (order === "asc") {
              paginatedData.sort((a, b) => a.rating - b.rating);
            }
            if (order === "desc") {
              paginatedData.sort((a, b) => b.rating - a.rating);
            }
          } else {
            paginatedData.sort((a, b) => a.rating - b.rating);
          }
        }
      } else {
        if (filter) {
          return paginatedData.filter(
            (pizza) => pizza.category === parseInt(filter)
          );
        }
      }

      return paginatedData;
    } else {
      return { message: "Array is Empty" };
    }
  },
};

export default pizzaService;
