import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { PrismaClient } from "./generated/prisma/index.js";
import cookieParser from 'cookie-parser';



// !! Imported routes

// ?? <----------------------------------------------------------------------------------------->

import authRoutes from './routes/auth.routes.js';
import dishRoutes from './routes/dish.routes.js';
import orderRoutes from './routes/orders.routes.js';

// ?? <----------------------------------------------------------------------------------------->

dotenv.config();

const app = express();
const server = createServer(app)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();
app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('Hello Worldnn!');
});

// !! Mouting the auth routes : 
app.use('/api/auth', authRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


