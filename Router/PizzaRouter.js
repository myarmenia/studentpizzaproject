import { Router } from "express";
import pizzaController from "../Controller/PizzaController.js";

const pizzaRouter = Router();

pizzaRouter.get("/", pizzaController.getAll);

export default pizzaRouter;
