import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connection from "./Utils/Connection.js";
import credentials from "./Config/Credentials.js";
import corsOptions from "./Config/CorsOptions.js";

import seedRouter from "./Router/seedRouter.js";
import pizzaRouter from "./Router/PizzaRouter.js";
import cartRouter from "./Router/CartRouter.js";
import authRouter from "./Router/AuthRouter.js";

import swaggerUI from "swagger-ui-express";
import { specs } from "./Utils/Swagger/Swagger.js";

const app = express();
dotenv.config();
connection();

app.use(credentials);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  "/api/swagger",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

app.use("/api/seed", seedRouter);
app.use("/api/pizzas", pizzaRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNING ON PORT ${process.env.PORT}`);
});
