import mongoose from 'mongoose';
import User from '../models/userModel';
import Song from '../models/songModel';

import usersSeedData from './001_users';
import songsSeedData from './002_songs';

const dbConnectionURL = "mongodb://localhost:27017/myMeditationApp";

mongoose.connect(dbConnectionURL, {
  useUnifiedTopology: true,
} as any)
.then(async () => {
  console.log('Database connected');

  // Clear existing data
  await User.deleteMany({});
  await Song.deleteMany({});

  // Seed new data
  await User.insertMany(usersSeedData);
  await Song.insertMany(songsSeedData);

  console.log('Database seeded');
  mongoose.connection.close();
})
.catch((err) => {
  console.log('Database seeding error', err);
});
