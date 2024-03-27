import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('open', () => {
  console.log('Connected to Mongo');
});
