import { Request, Response, NextFunction } from 'express';
import { getUserFromToken } from './getUserFromToken';

// Define a new interface that extends Request
interface AuthenticatedRequest extends Request {
  user?: any; // This will allow adding a `user` property to Request
}

const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): boolean => {
  // Perform authentication logic here, such as checking if a token is valid
  // Once authenticated, you attach user information to req.user
  
  const user = getUserFromToken(req.headers.authorization); // Example function to extract user from token
  
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }
  
  req.user = user; // Attach user information to req.user
  return true;
};

export default authenticateUser;