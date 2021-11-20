import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import product from './routes/product.js';
import order from './routes/order.js';
import errorMiddleware from './middleware/error.js';
import path from 'path';
import dotenv from 'dotenv';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({path: './config/config.env'});
}

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/products', product);
app.use(order);


mongoose.connect(process.env.MONGOURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', ()=>{
  console.log('DB connected');
});

// Middleware for Errors
app.use(errorMiddleware);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res)=>{
    res.sendFile(
        path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// listen

app.listen(port, ()=> console.log(`server response ${port}`));
