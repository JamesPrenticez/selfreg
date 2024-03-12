import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

// Assuming this is your secret key used to sign JWT tokens
const secretKey = 'your_secret_key_goes_here';

export const getUserFromToken = (authorizationHeader: string | undefined): User | null => {
  if (!authorizationHeader) {
    return null;
  }

  // Extract the token from the Authorization header
  const token = authorizationHeader.split(' ')[1];

  try {
    // Verify the token and extract the user information
    const decodedToken = jwt.verify(token, secretKey) as User;
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
