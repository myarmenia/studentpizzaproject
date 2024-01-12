import authService from "../Service/AuthService.js";

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = await authService.login(email, password);
      res.cookie("token", users.token, {
        httpOnly: true,
        sameSite: "strict",
      });
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ CriticalError: "Internal Server Error" });
    }
  },
};

export default authController;
