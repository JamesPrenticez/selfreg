import express from "express";

const router = express.Router();

import songRoutes from './songRoutes'
import userRoutes from './userRoutes'

router.use('/songs', songRoutes);
router.use('/users', userRoutes);

export default router;
