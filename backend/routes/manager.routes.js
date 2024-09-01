import {ManagerLogin,ManagerLogout} from "../controllers/manager.controller.js";

import express from "express";

const router = express.Router();

router.route("/login").post(ManagerLogin);
router.route("/logout").post(ManagerLogout);

export default router;
