import express from 'express';
import * as authController from "@controllers/authControllers";

const router = express.Router();

router.post('/api/signUp', authController.signUp);
router.post('/api/signIn', authController.signIn);

export default router;