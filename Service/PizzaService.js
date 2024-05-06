import Pizza from "../Model/PizzaModel.js";

const pizzaService = {
  getAll: async (sort, order, filter, search, page, size) => {
    const pizzas = await Pizza.find();

    const skip = (page - 1) * size;
    const pageCount = size ? Math.ceil(pizzas.length / size) : 1;
    const data =
      page && size
        ? { pizzas: pizzas.slice(skip, skip + size), pageCount }
        : { pizzas, pageCount };

    if (pizzas.length > 0) {
      if (search) {
        const searchByTitle = pizzas.filter((el) =>
          el.title.toLowerCase().includes(search.toLowerCase())
        );

        if (searchByTitle.length) {
          return searchByTitle;
        } else {
          return { message: "No Pizza With This Tilte" };
        }
      } else {
        if (sort) {
          if (sort === "price") {
            if (order) {
              if (order === "asc") {
                data.pizzas.sort((a, b) => a.price - b.price);
              }
              if (order === "desc") {
                data.pizzas.sort((a, b) => b.price - a.price);
              }
            } else {
              data.pizzas.sort((a, b) => a.price - b.price);
            }
          }

          if (sort === "alp") {
            data.pizzas.sort((a, b) => a.title.localeCompare(b.title));
          }
          if (sort === "rating") {
            if (order) {
              if (order === "asc") {
                data.pizzas.sort((a, b) => a.rating - b.rating);
              }
              if (order === "desc") {
                data.pizzas.sort((a, b) => b.rating - a.rating);
              }
            } else {
              data.pizzas.sort((a, b) => a.rating - b.rating);
            }
          }
        } else {
          if (filter) {
            return data.pizzas.filter(
              (pizza) => pizza.category === parseInt(filter)
            );
          }
        }

        return data;
      }
    } else {
      return { message: "Array is Empty" };
    }
  },

  getByID: async (id) => {
    const pizza = await Pizza.findById(id);
    if (pizza) {
      return pizza;
    } else {
      return { message: "Something Went Wrong Please Check Pizza ID" };
    }
  },
};

export default pizzaService;
