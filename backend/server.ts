import path from 'path';
import express from 'express';
import pageRoutes from '@routes/pages';
import apiRoutes from '@routes/api';

import swaggerUi from "swagger-ui-express"
import swaggerFile from './public/swagger.json';

// Initialize express
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Set JSON formatting
app.set('json spaces', 2);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve swagger api docs
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Start the server only if the database connection is successful
const PORT = process.env.PORT || 5000;
  
// Use routes
app.use(pageRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
