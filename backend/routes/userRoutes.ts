import express from 'express';
import * as userController from "@controllers/userControllers";

const router = express.Router();

router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUserById);

export default router;