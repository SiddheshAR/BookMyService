import  express from "express";
import { ServiceProviderLogin, serviceProviderRegister } from "../controllers/serviceProvider.controller.js";

const router = express.Router();

router.route("/register").post(serviceProviderRegister);
router.route("/login").post(ServiceProviderLogin);
export default router;
