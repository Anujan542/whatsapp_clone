import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.services.js";
import { generateToken, verifyToken } from "../services/token.services.js";
import { findUser } from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, picture, status } = req.body;

    const newUser = await createUser({
      name,
      email,
      password,
      picture,
      status,
    });

    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });

    res.json({
      messsage: "Register success",
      access_token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await signUser(email, password);

    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    const refresh_token = await generateToken(
      { userId: user._id },
      "30d",
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });

    res.json({
      messsage: "login success",
      access_token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", {
      path: "/api/v1/auth/refreshtoken",
    });
    console.log("done");
    res.json({
      message: "logged out!",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) {
      throw createHttpError.Unauthorized("Please login!");
    }

    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await findUser(check.userId);

    const access_token = await generateToken(
      { userId: user._id },
      "1d",
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      messsage: "user info",
      access_token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
