import { Router } from "express";
const authRouter = Router();
import AuthController from "../Controller/AuthController.js";

authRouter.get("/get", (req, res) => {
  const token = req.headers.cookie.token;
  // console.log(token);
});

authRouter.post("/login", AuthController.login);

export default authRouter;
