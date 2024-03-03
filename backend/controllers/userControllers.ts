import { type Request, type Response } from 'express';
import prisma from '@/prisma';
import { User } from '@prisma/client';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await prisma.user.findMany();
    res.status(200).json({
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching users',
    });
  }
};

