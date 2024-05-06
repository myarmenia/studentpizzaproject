import { Router } from "express";
import cartController from "../Controller/CartController.js";
const cartRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: Cart managing APIs
 */

/**
 * @swagger
 *  /api/cart:
 *    get:
 *      summary: Get all cart items
 *      tags: [Cart]
 *      responses:
 *        200:
 *          description: Success
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Cart"
 */

cartRouter.get("/", cartController.getAll);

/**
 * @swagger
 *  /api/cart/add:
 *    post:
 *      summary: Add pizza to cart
 *      tags: [Cart]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/request/AddToCart"
 *      responses:
 *        201:
 *          description: Created
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Cart"
 */

cartRouter.post("/add", cartController.addToCart);

/**
 * @swagger
 *  /api/cart/checkout:
 *    post:
 *      summary: Checkout All Cart Items
 *      tags: [Cart]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        201:
 *          description: Bought
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Cart"
 */
cartRouter.post("/checkout", cartController.checkout);

/**
 * @swagger
 *  /api/cart/changeCount:
 *    put:
 *      summary: Change count of the cart item
 *      tags: [Cart]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/request/ChangeCount"
 *      responses:
 *        200:
 *          description: Updated
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Cart"
 */

cartRouter.put("/changeCount", cartController.changeCount);

/**
 * @swagger
 *  /api/cart/deleteOne:
 *    delete:
 *      summary: Delete item from subCategory
 *      tags: [Cart]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/request/DeleteOne"
 *      responses:
 *        204:
 *          description: Deleted
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Cart"
 */

cartRouter.delete("/deleteOne", cartController.deleteOne);

/**
 * @swagger
 *  /api/cart/deletePizza:
 *    delete:
 *      summary: Delete Pizza from Cart
 *      tags: [Cart]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/request/DeletePizza"
 *      responses:
 *        204:
 *          description: Deleted
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Cart"
 */

cartRouter.delete("/deletePizza", cartController.deletePizza);

/**
 * @swagger
 *  /api/cart/deleteAll:
 *    delete:
 *      summary: Delete All Cart Items
 *      tags: [Cart]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      responses:
 *        204:
 *          description: Deleted
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Cart"
 */

cartRouter.delete("/deleteAll", cartController.deleteAll);

export default cartRouter;
