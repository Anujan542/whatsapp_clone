import express from "express";
import trimRequest from "trim-request";

import authMiddleware from "../middleware/authMiddleware.js";
import { searchUsers } from "../controller/user.controller.js";

const router = express.Router();

router.route("/").get(trimRequest.all, authMiddleware, searchUsers);

export default router;
