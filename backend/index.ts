import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from '@routes/api';  // Update the import path according to your project structure

// Initialize express
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Set JSON formatting
app.set('json spaces', 2);

// MongoDB connection URL
const dbConnectionURL = "mongodb://localhost:27017/myMeditationApp";

// Connect to MongoDB
mongoose.connect(dbConnectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any )
.then(() => {
  console.log("Database connected");

  // Start the server only if the database connection is successful
  const PORT = process.env.PORT || 3001;
  
  // Use routes
  app.use('/api', apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.log("Database connection failed", err);
});
