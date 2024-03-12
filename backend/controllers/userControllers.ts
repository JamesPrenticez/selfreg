import { type Request, type Response } from 'express';
import prisma from '@/prisma';
import { User } from '@prisma/client';

// Get all users
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: `An error occurred while fetching user with id ${email}`,
    });
  }
};

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

