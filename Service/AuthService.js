import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Utils/GenerateToken.js";
import Token from "../Model/TokenModel.js";

const AuthService = {
  signUp: async (email, password, firstname, lastname, username) => {
    const [findUsername, findEmail] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (!findUsername) {
      if (!findEmail) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
          email,
          password: hashedPassword,
          firstname,
          lastname,
          username,
        });

        await newUser.save();

        return { message: "You Have Successfully Registered" };
      } else {
        return { message: "User With This Email Already Exists" };
      }
    } else {
      return { message: "User With This Username Already Exists" };
    }
  },
  signIn: async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const access_token = generateAccessToken(user);
        const refresh_token = generateRefreshToken(user);

        const newRefreshToken = new Token({
          user_id: user._id,
          token: refresh_token,
        });

        await newRefreshToken.save();

        return {
          message: "You Have Successfully Logged In",
          access_token,
          refresh_token,
        };
      } else {
        return { message: "Something is Wrong Please Check Your Password" };
      }
    } else {
      return { message: "Something is Wrong Please Check Your Email Address" };
    }
  },
  refresh: async (refresh_token) => {
    if (refresh_token) {
      const token = await Token.findOne({ token: refresh_token });

      if (token) {
        const newTokens = jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN,
          async (err, data) => {
            if (err) console.error(err);

            const deleteToken = await Token.findOneAndDelete({
              token: refresh_token,
            });
            const newAccessToken = generateAccessToken(data);
            const newRefreshToken = generateRefreshToken(data);
            const savedRefreshToken = new Token({
              user_id: data._id,
              token: newRefreshToken,
            });

            await savedRefreshToken.save();

            return {
              message: "Token is Refreshed",
              access_token: newAccessToken,
              refresh_token: newRefreshToken,
            };
          }
        );

        return newTokens;
      } else {
        return { message: "Invalid Token" };
      }
    } else {
      return { message: "No Refresh Token" };
    }
  },
  signOut: async (refresh_token) => {
    if (refresh_token) {
      const deleteRefreshToken = await Token.findOneAndDelete({
        token: refresh_token,
      });

      if (deleteRefreshToken) {
        return { message: "You Have Successfully Sign Out" };
      } else {
        return { message: "Invalid Token" };
      }
    } else {
      return { message: "No Refresh Token" };
    }
  },
};

export default AuthService;
