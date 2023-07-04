import createHttpError from "http-errors";
import { searchUsers as searchUsersService } from "../services/user.services.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;

    if (!keyword) {
      throw createHttpError.BadRequest("Oops..! something went wrong.!");
    }

    const users = await searchUsersService(keyword);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
