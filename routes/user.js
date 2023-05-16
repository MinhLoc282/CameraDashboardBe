import express from 'express';

import {
  getUserInfo,
  getAllUsers,
  countProfile,
} from '../controllers/userControllers.js';
import isAuth from '../middleware/checkRole.js';

const userRouter = express.Router();

userRouter.get('/count', countProfile);
userRouter.get('/:id', getUserInfo);
userRouter.get('/', isAuth, getAllUsers);

export default userRouter;
