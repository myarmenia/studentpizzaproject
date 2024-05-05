import Pizza from "../Model/PizzaModel.js";

const pizzaService = {
  getAll: async (sort, order, filter, page, size) => {
    const pizzas = await Pizza.find();

    const skip = (page - 1) * size;
    const paginatedData = pizzas.slice(skip, skip + size);
    console.log(size);
    console.log(paginatedData);

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
  searchData: async (value) => {
    let data = await Pizza.find();

    if (value) {
        const searchByTitle = data.filter((el) =>
          el.title.toLowerCase().includes(value.toLowerCase())
        )
        if (searchByTitle.length) {
          data = searchByTitle

          return data
        } else {
          return { message: "No Pizza With This Tilte" }
        }
    } else {
      const paginatedData = data.slice(0, 4);
      return paginatedData
    }


  },
  getByID: async (id) => {
    const data = await Pizza.findById(id)
    if(data){
      return data
    }else{
      return {message:"Something Went Wrong Please Check Pizza ID"}
    }

  },
};

export default pizzaService;
