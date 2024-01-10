import { Router } from "express";
import Pizza from "../Model/PizzaModel.js";
import User from "../Model/UserModel.js";
import { data, users } from "../data.js";

const seedRouter = Router()

seedRouter.get("/", async (req, res) => {
    await Pizza.deleteMany({})
    const createdPizzas = await Pizza.insertMany(data)
    res.send(createdPizzas)
})

seedRouter.get("/users", async (req,res) => {
    await User.deleteMany({})
    const createdUsers = await User.insertMany(users)
    res.send(createdUsers)
})
export default seedRouter

