import express from "express";

const router = express.Router();

import songRoutes from './songRoutes'
import userRoutes from './userRoutes'

router.use(songRoutes);
router.use(userRoutes);

export default router;
