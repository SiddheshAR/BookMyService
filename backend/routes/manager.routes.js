import {ManagerLogin,ManagerLogout} from "../controllers/manager.controller.js";
import isAuthenticated from "../middleware/userAuthenticated.js";
import AuthRoles from "../middleware/AuthorizeRole.js";
import express from "express";

const router = express.Router();

router.route("/login").post(ManagerLogin);
router.route("/logout").get(isAuthenticated,AuthRoles("manager"),ManagerLogout);

export default router;
