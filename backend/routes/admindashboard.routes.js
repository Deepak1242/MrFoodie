import express from 'express';
import { getAdminAnalytics } from '../controllers/admin.controllers.js';
import { authAdminMiddleware,authUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/analytics', authAdminMiddleware, getAdminAnalytics); // protect with admin middleware

export default router;
