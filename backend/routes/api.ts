import express from "express";

const router = express.Router();

import authRoutes from './authRoutes'
import userRoutes from './userRoutes'

router.use(authRoutes);
router.use(userRoutes);

export default router;
