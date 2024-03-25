import express from 'express';
import * as testController from "../controllers/testControllers";

const router = express.Router();

router.post('/api/test/env', testController.testENV);

export default router;