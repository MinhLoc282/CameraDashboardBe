import express from 'express';

import { getUserInfo } from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.get('/:id', getUserInfo);

export default userRouter;
