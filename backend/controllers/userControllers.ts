import { type Request, type Response } from 'express';
import prisma from '@/prisma';
import { User } from '@prisma/client';

// Get all users
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
      return;
    }

    // Everything except the password hash
    const { firstName, lastName, email, phone, profilePicture, locale, country, permissions, subscription, dateCreated, lastModified } = user;

    res.status(200).json({
      data: {
        firstName,
        lastName,
        email,
        phone,
        profilePicture,
        locale,
        country,
        permissions,
        subscription,
        dateCreated,
        lastModified,
      },
    });
  } catch (err) {
    console.error(`Error fetching user with id ${id}:`, err);
    res.status(500).json({
      message: `An error occurred while fetching user with id ${id}`,
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

