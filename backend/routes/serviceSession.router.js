import express from 'express';
import { CreateService,getAllServices } from '../controllers/service.controller.js';
import AuthRoles from '../middleware/AuthorizeRole.js';
import isAuthenticated from '../middleware/userAuthenticated.js';
import { createServiceSession,updateServiceStatus } from '../controllers/serviceSession.controller.js';

const router = express.Router();

router.route('/create').post(isAuthenticated,AuthRoles("manager"),CreateService);
router.route('/getServices').post(getAllServices);
router.route('/createSession').post(isAuthenticated,createServiceSession);
router.route('/updateStatus').post(isAuthenticated,AuthRoles("manager"),updateServiceStatus);

export default router;