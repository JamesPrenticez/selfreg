import { Request, Response } from 'express';
import Song, { type ISong } from '../models/songModel';

// Get all songs
export const getAllSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    const songs: ISong[] = await Song.find();
    res.status(200).json({
      status: 'success',
      data: {
        songs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred while fetching songs',
    });
  }
};

// Stream a song by ID
export const streamSong = async (req: Request, res: Response): Promise<void> => {
  try {
    const song: ISong | null = await Song.findById(req.params.id);
    if (!song) {
      res.status(404).json({
        status: 'fail',
        message: 'Song not found',
      });
      return;
    }
    // Logic for streaming the song goes here.
    res.status(200).json({
      status: 'success',
      data: {
        song,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'An error occurred',
    });
  }
};
