import express from 'express';
import * as userController from "@controllers/userControllers";

const router = express.Router();

router.get('/api/user/:id', userController.getUser);
router.get('/api/users', userController.getAllUsers);

export default router;