import createHttpError from "http-errors";
import { searchUsers as searchUsersService } from "../services/user.services.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    const userId = req.user.userId;

    if (!keyword) {
      throw createHttpError.BadRequest("Oops..! something went wrong.!");
    }

    const users = await searchUsersService(keyword, userId);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
