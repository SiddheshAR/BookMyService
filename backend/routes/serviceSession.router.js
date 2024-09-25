import express from 'express';
import { CreateService,getAllServices,getServiceByID } from '../controllers/service.controller.js';
import AuthRoles from '../middleware/AuthorizeRole.js';
import isAuthenticated from '../middleware/userAuthenticated.js';
import { createServiceSession,updateServiceStatus,getServiceSession, getSessionById, getCurrentSessions, assignServiceProvider, getAssignedProvider, sessionConfirmCode } from '../controllers/serviceSession.controller.js';

const router = express.Router();

router.route('/create').post(isAuthenticated,AuthRoles("manager"),CreateService);
router.route('/getServices').get(getAllServices);
router.route('/getServiceById/:id').get(getServiceByID);
router.route('/getSessionByUser/:id').get(isAuthenticated,AuthRoles("user"),getSessionById);
router.route('/getSessions').get(isAuthenticated,AuthRoles("manager"),getServiceSession);
router.route('/createSession').post(isAuthenticated,createServiceSession);
router.route('/updateStatus').post(isAuthenticated,AuthRoles("manager"),updateServiceStatus);
router.route('/getSessions').post(isAuthenticated,AuthRoles("user"),getCurrentSessions);
router.route('/assignServiceProvider').put(isAuthenticated,AuthRoles("manager"),assignServiceProvider);
router.route('/getServiceProvider').get(isAuthenticated,AuthRoles("serviceProvider"),getAssignedProvider);
router.route("/confirmcode").post(isAuthenticated,AuthRoles("serviceProvider"),sessionConfirmCode);
export default router;