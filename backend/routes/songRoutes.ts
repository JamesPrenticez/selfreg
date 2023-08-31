import express from 'express';
import * as songController from "@controllers/songControllers";

const router = express.Router();

router.get('/', songController.getAllSongs);
router.get('/:id/stream', songController.streamSong);

export default router;