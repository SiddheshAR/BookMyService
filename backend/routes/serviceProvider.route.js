import  express from "express";
import { ServiceProviderLogin, serviceProviderRegister,serviceProviderLogout } from "../controllers/serviceProvider.controller.js";
import { CreateService } from "../controllers/service.controller.js";

const router = express.Router();

router.route("/register").post(serviceProviderRegister);
router.route("/login").post(ServiceProviderLogin);
router.route("/logout").post(serviceProviderLogout);
router.route("/create").post(CreateService);
export default router;
