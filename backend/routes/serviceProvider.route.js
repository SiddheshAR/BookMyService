import  express from "express";
import { ServiceProviderLogin, serviceProviderRegister,serviceProviderLogout,getServiceProviders } from "../controllers/serviceProvider.controller.js";
import { CreateService } from "../controllers/service.controller.js";
import isAuthenticated from "../middleware/userAuthenticated.js";
import AuthRoles from "../middleware/AuthorizeRole.js";

const router = express.Router();

router.route("/register").post(serviceProviderRegister);
router.route("/login").post(ServiceProviderLogin);
router.route("/logout").get(isAuthenticated,AuthRoles("serviceProvider"),serviceProviderLogout);
router.route("/create").post(CreateService);
router.route("/getServiceProviders").get(isAuthenticated,AuthRoles("manager"),getServiceProviders);
export default router;
