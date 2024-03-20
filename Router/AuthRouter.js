import { Router } from "express";
const authRouter = Router();
import AuthController from "../Controller/AuthController.js";

authRouter.get("/get", (req, res) => {
  const token = req.headers.cookie.token;
  // console.log(token);
});

authRouter.post("/signUp", AuthController.signUp);
authRouter.post("/signIn", AuthController.signIn);
authRouter.post("/refresh", AuthController.refresh);
authRouter.post("/signOut", AuthController.signOut);

export default authRouter;
