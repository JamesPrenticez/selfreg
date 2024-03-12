import path from 'path';
import express from 'express';
import cors from 'cors';
import pageRoutes from '@routes/pages';
import apiRoutes from '@routes/api';

import swaggerUi from "swagger-ui-express"
import swaggerFile from './public/swagger.json';

// Initialize express
const app = express();

// Middleware to verify JWT token
// this comes from utils nows
// verifyToken middleware checks if a valid JWT token is present in the Authorization header. If the token is valid, the route handler (/logout) responds with a success message.
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     req.user = decoded;
//     next();
//   });
// };

// // Sign-out route
// app.post('/logout', verifyToken, (req, res) => {
//   // In a stateless JWT system, there's no server-side token to invalidate
//   // The client is responsible for deleting the token on their side

//   res.json({ message: 'Successfully signed out' });
// });


// Middleware for JSON parsing
app.use(express.json());

// Cross Origin
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Set JSON formatting
app.set('json spaces', 2);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve swagger api docs
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Start the server only if the database connection is successful
const PORT = process.env.PORT || 5000;
  
// Use routes
// app.use(pageRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // TODO https://www.npmjs.com/package/open
});
