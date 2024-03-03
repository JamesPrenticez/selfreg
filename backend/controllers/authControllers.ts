
import { type Request, type Response } from 'express';
import prisma from '@/prisma';
import jwt  from 'jsonwebtoken'
import { createHashedPassword, verifyPassword } from '@/utils';

// const secret = process.env.SECRET_KEY 

// SignIn
export const signIn = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await verifyPassword(password, user.passwordHash)) {
      // Generate a JWT token
      const token = jwt.sign({ username: user.email, userId: user.id }, "your_secret_key_goes_here", { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

  } catch (err) {
    return res.status(500).json({ message: 'Internal server error'});
  }
};

// SignUp
export const signUp = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a hashed password
    const hashedPassword = await createHashedPassword(password);

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    });

    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ email: newUser.email, userId: newUser.id }, "your_secret_key_goes_here", { expiresIn: '1h' });

    return res.json({ 
      jwt: token,
    });

  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
