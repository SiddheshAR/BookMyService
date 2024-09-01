import express from 'express';
import { CreateService } from '../controllers/service.controller.js';
import AuthRoles from '../middleware/AuthorizeRole.js';
import isAuthenticated from '../middleware/userAuthenticated.js';

const router = express.Router();

router.route('/create').post(isAuthenticated,AuthRoles("manager"),CreateService);


export default router;