import { Router } from "express";
import pizzaController from "../Controller/PizzaController.js";

const pizzaRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Pizza
 *  description: Pizzas managing APIs
 */

/**
 * @swagger
 *  /api/pizzas:
 *    get:
 *      summary: Get all pizzas
 *      tags: [Pizza]
 *      parameters:
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *          description: Sort pizzas by a specific attribute (e.g., "alp", "price", "rating").
 *        - in: query
 *          name: order
 *          schema:
 *            type: string
 *          description: Order of sorting (e.g., "asc" for ascending, "desc" for descending).
 *        - in: query
 *          name: filter
 *          schema:
 *            type: string
 *          description: Filter pizzas based on a specific criteria.
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *          description: Number of Page
 *        - in: query
 *          name: size
 *          schema:
 *            type: number
 *          description: Size of Pizzas  
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pizza"
 */

pizzaRouter.get("/", pizzaController.getAll);


/**
 * @swagger
 *  /api/pizzas/search:
 *   get:
 *      summary: Return Searched Pizzas
 *      tags: [Pizza]
 *      parameters:
 *        - in: query
 *          name: value
 *          schema: 
 *            type: string
 *            description: Pizzas Searched By Title
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pizza"
 */

pizzaRouter.get("/search", pizzaController.searchPizza)

/**
 * @swagger
 *  /api/pizzas/{id}:
 *   get:
 *      summary: Return Pizzas By ID
 *      tags: [Pizza]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Get Pizza by ID
 *          required: true
 *          schema: 
 *            type: string
 *            format: id
 *      responses:
 *          200:
 *              description: Success
 *              contents:
 *                  application/json:
 *                      schema:
 *                        $ref: "#/components/schemas/Pizza"
 */
pizzaRouter.get("/:id", pizzaController.getByID)

export default pizzaRouter;
