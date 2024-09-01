import express from "express"
import { register,UserLogin,userLogout } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/userAuthenticated.js";
import AuthRoles from "../middleware/AuthorizeRole.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(UserLogin);
router.route("/logout").post(isAuthenticated,AuthRoles,userLogout);

export default router;