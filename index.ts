import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use('/', express.static('public'));

const serve = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION ?? '');

  app.listen(5000, () => {
    console.log('listening to 5000');
  });
};

serve();
