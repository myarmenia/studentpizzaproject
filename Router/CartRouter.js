import { Router } from "express";
import cartController from "../Controller/CartController.js";
const cartRouter = Router();

cartRouter.get("/", cartController.getAll);

cartRouter.post("/add", cartController.addToCart);

cartRouter.delete("/deleteOne", cartController.deleteOne);

cartRouter.delete("/deletePizza", cartController.deletePizza);

cartRouter.delete("/deleteAll", cartController.deleteAll);

export default cartRouter;
