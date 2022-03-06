import express from 'express';
import mongoose from 'mongoose';
import filesRouter from './src/routes/fileRoutes';
import fs from 'fs';
import path from 'path';

const PORT_NUMBER = process.env.PORT || 500;

const app = express();

app.use('/', express.static('public'));
app.use('/api', filesRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create an 'uploads' folder
try {
  fs.mkdirSync(path.resolve('uploads'));
  console.log('dir made');
} catch (err: any) {
  if (err?.code !== 'EEXIST') throw err;
}

const serve = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION ?? '');
  app.listen(PORT_NUMBER, () => {
    console.log(`listening to ${PORT_NUMBER}`);
  });
};

serve();
