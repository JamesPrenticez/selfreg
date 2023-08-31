import express from 'express';
import * as userController from "@controllers/userControllers";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id/stream', userController.getUserById);

export default router;