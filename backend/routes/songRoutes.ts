import express from 'express';
import * as songController from "@controllers/songControllers";

const router = express.Router();

router.get('/api/songs', songController.getAllSongs);
router.get('/api/songs/:id/stream', songController.streamSong);

export default router;