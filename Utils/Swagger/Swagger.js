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
            pizzaId: { type: "string", description: "Company ID" },
            type: { type: ["string"], description: "Teacher ID" },
            size: { type: ["string"], description: "Teacher ID" },
          },
          example: {
            pizzaId: "65b358b558bb92966f212454",
            type: [0],
            size: [26],
          },
        },
        ChangeCount: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Cart Item _id" },
            count: { type: "number", description: "count" },
          },
          example: {
            _id: "65b3a5d058bb92966f212469",
            count: 3,
          },
        },
        DeleteOne: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Cart Item _id" },
          },
          example: {
            _id: "65b3a5d058bb92966f212469",
          },
        },
        DeletePizza: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Cart Item _id" },
          },
          example: {
            _id: "65b3a5d058bb92966f212469",
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
                    type: "array",
                    items: {
                      type: "number",
                      enum: [0, 1],
                    },
                  },
                  size: {
                    type: "array",
                    items: {
                      type: "number",
                      enum: [0, 1],
                    },
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

        Course: {
          type: "object",
          require: [
            "pending",
            "title",
            "category",
            "stage",
            "description",
            "ageLimit",
            "finalExam",
            "certificate",
            "price",
          ],
          properties: {
            pending: { type: "boolean" },
            title: { type: "string" },
            image: { type: "string" },
            category: {
              type: "string",
              description: "Id of the category that belongs to",
            },
            stage: {
              type: "string",
              description: "Id of the stage that belongs to",
            },
            description: { type: "string" },
            ageLimit: {
              min: { type: "number" },
              max: { type: "number" },
            },
            finalExam: { type: "boolean" },
            certificate: { type: "boolean" },
            price: { type: "number" },
            phases: [
              {
                type: "string",
                description: "Id of phases that belong to this course",
              },
            ],
            teacher: {
              type: "string",
              description: "Id of the teacher that created",
            },
            company: {
              type: "string",
              description: "Id of the company that created",
            },
            rating: [
              {
                rater: {
                  type: "string",
                  description: "Id of the user that belongs rated",
                },
                rate: { type: "number" },
                description: "Not developed yet",
              },
            ],
            comments: [
              {
                user: {
                  type: "string",
                  description: "Id of the user that commneted",
                },
                comment: { type: "string" },
                description: "Not developed yet",
              },
            ],
          },
        },
        // securitySchemes: {
        //   ApiKeyAuth: {
        //     type: "apiKey",
        //     in: "header",
        //     name: "Authorization",
        //   },
        // },
      },
    },
    // security: [
    //   {
    //     ApiKeyAuth: [],
    //   },
    // ],
  },
  apis: ["./Router/*.js"],
};
export const specs = swaggerJSDoc(options);
