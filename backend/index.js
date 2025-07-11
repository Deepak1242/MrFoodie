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
import reviewRoutes from './routes/reviews.routes.js';
import getAdminAnalytics from './routes/admindashboard.routes.js';
import webhookRoutes from './routes/webhook.routes.js';
import paymentRoutes from './routes/payments.route.js';



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

//!!Middleware to handle JSON body parsing for all routes except the webhook route
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next(); // skip body parsing for webhook
  } else {
    express.json()(req, res, next);
  }
})

// !! Mouting the auth routes : 

app.use('/api/auth', authRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', getAdminAnalytics);
app.use('/api/webhook', webhookRoutes);
app.use('/api/payment', paymentRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// >> Check List << //
// !! Need to check the payment and webhook routes after the frontend is ready !! //
// ??????????????? // 

