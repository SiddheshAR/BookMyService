import express from "express"
import { register,UserLogin } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(UserLogin);
export default router;