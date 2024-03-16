import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const validateJWT = (req: Request, res: Response, next: NextFunction): void | Response<any>=> {
  console.log("1", req.cookies.JWT_TOKEN)
 
  const JWTCookie = req.cookies.JWT_TOKEN;
  const token = JWTCookie && JWTCookie.split(' ')[1];

  console.log("2", token)
  console.log("3", process.env.SECRET_KEY)

  const SECRET_KEY = "your_secret_key_goes_here"

  if (token == null) {
    return res.sendStatus(401);
  }

  // Verify token
  jwt.verify(token, SECRET_KEY as string, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      // Token is valid, attach decoded payload to request object
      // req.user = decoded;
      next();
    }
  });
};