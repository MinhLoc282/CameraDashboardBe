import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import cameraRouter from './routes/camera.js';
import locationRouter from './routes/location.js';
import warningRouter from './routes/warning.js';
import statisticRouter from './routes/statistic.js';
import videosRouter from './routes/videos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3009;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDb'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api', cameraRouter);
app.use('/api', locationRouter);
app.use('/api', warningRouter);
app.use('/api', statisticRouter);
app.use('/api', videosRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
