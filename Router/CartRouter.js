import { Router } from "express";
import cartController from "../Controller/CartController.js";
const cartRouter = Router()

cartRouter.get("/", cartController.getAll)
cartRouter.post("/add", cartController.addToCart)
cartRouter.put("/count", cartController.changeCount)
cartRouter.delete("/deleteOne", cartController.deleteOne)
cartRouter.delete("/deleteAll", cartController.deleteAll)

export default cartRouter