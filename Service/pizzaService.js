import Pizza from "../Model/PizzaModel.js";

const pizzaService = {
  getAll: async (sort, type, filter) => {
    
    const pizzas = await Pizza.find();

    if (sort) {
      console.log("sort");
      if (sort === "price") {
        if (type) {
          if (type === "asc") {
            pizzas.sort((a, b) => a.price - b.price);
          }
          if (type === "desc") {
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
        if (type) {
          if (type === "asc") {
            pizzas.sort((a,b) => a.rating - b.rating )
          }
          if (type === "desc") {
            pizzas.sort((a,b) => b.rating - a.rating)
          }
        }else{
          pizzas.sort((a,b) => a.rating - b.rating)
        }
      }
    }else{
      // Filter With Catergory
      if (filter) {
        console.log("filter");
        return pizzas.filter(pizza => pizza.category === parseInt(filter));
      }
    }
   
    return pizzas
  },


};

export default pizzaService;
