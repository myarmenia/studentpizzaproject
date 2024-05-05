import swaggerJSDoc from "swagger-jsdoc";
import { configDotenv } from "dotenv";
const dotenv = configDotenv();

export const options = {
  explorer: true,
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pizza",
      version: "1.0.0",
      description: "Students Projects: Pizza Store APIs",
    },
    servers: [
      { url: "http://pizza.trigger.ltd" },
      { url: "http://195.181.242.194" },
    ],
    components: {
      request: {
        AddToCart: {
          type: "object",
          properties: {
            pizzaId: { type: "string", description: "Pizza ID" },
            type: { type: "string", description: "Pizza Type Number" },
            size: { type: "string", description: "Pizza Size" },
          },
          example: {
            pizzaId: "65b358b558bb92966f212454",
            type: "0",
            size: "26",
          },
        },
        ChangeCount: {
          type: "object",
          properties: {
            pizzaId: { type: "string", description: "Pizza _id" },
            itemId: { type: "string", description: " _id of The Element Which Count Will be Changed" },
            count: { type: "number", description: "count" },
          },
          example: {
            pizzaId: "65b3a5d058bb92966f212469",
            itemId : "66377b908034eaec7b5aa2be",
            count: 3,
          },
        },
        DeleteOne: {
          type: "object",
          properties: {
            pizzaId: { type: "string", description: "Pizza _id" },
            itemId: { type: "string", description: " _id of The Element Which You Want to Delete" },
          },
          example: {
            pizzaId: "65b3a5d058bb92966f212469",
            itemId : "66377b908034eaec7b5aa2be",
          },
        },
        DeletePizza: {
          type: "object",
          properties: {
            pizzaId: { type: "string", description: "Cart Item _id" },
          },
          example: {
            pizzaId: "65b3a5d058bb92966f212469",
          },
        },
      },
      schemas: {
        Pizza: {
          type: "object",
          require: ["imageUrl", "title", "types", "sizes", "price", "category"],
          properties: {
            imageUrl: { type: "string", description: "required" },
            title: { type: "string", description: "required" },
            types: {
              type: "array",
              description: "Array of 0 or 1, required",
              items: {
                type: "number",
                enum: [0, 1],
              },
            },
            sizes: {
              type: "array",
              description: "Array of 0 or 1, required",
              items: {
                type: "number",
                enum: [0, 1],
              },
            },
            price: { type: "number", description: "required" },
            category: { type: "number", description: "required" },
            rating: { type: "number" },
          },
        },

        Cart: {
          type: "object",
          required: ["pizzaId", "totalPrice"],
          properties: {
            pizzaId: {
              type: "string",
              description:
                "_id of the Pizza you want to add to the cart, required",
            },
            subCategory: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: {
                      type: "number",
                      enum: [0, 1],
                  },
                  size: {
                      type: "number",
                      enum: [26, 30, 40],
                  },
                  count: {
                    type: "number",
                  },
                },
              },
            },
            totalPrice: { type: "number", description: "required" },
            count: { type: "number" },
          },
        },
      },
    },
  },
  apis: ["./Router/*.js"],
};
export const specs = swaggerJSDoc(options);
