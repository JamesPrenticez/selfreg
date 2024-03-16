import express from 'express';
import * as userController from "@controllers/userControllers";
import { validateJWT } from '@/utils';

const router = express.Router();

router.get('/api/user/:id', validateJWT, userController.getUser);
router.get('/api/users', userController.getAllUsers);

export default router;