import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3009;

const corsOptions = {
  origin: ['https://camera-dashboard-nhom14.vercel.app'],
};

app.options('*', cors());

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to MongoDb'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
