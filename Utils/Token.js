import Jwt from "jsonwebtoken";

const genToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  try {
    const token = Jwt.sign(payload, process.env.SECRET, {
      expiresIn: "5m",
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};

export default genToken;
