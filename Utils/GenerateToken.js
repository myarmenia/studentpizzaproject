import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });

  return access_token;
};

export const generateRefreshToken = (user) => {
  const payload = {
    _id: user.id,
    email: user.email,
  };

  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "20m",
  });

  return refresh_token;
};
