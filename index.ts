import express from 'express';
import mongoose from 'mongoose';
import filesRouter from './src/routes/fileRoutes';
import fs from 'fs';
import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const PORT_NUMBER = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
      },
      {
        url: 'https://arcane-river-51599.herokuapp.com/',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use('/', express.static('public'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
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
