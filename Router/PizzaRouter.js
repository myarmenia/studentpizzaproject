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
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Pizza"
 */

pizzaRouter.get("/", pizzaController.getAll);

export default pizzaRouter;
