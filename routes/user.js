import express from 'express';

import { getUserInfo, getAllUsers } from '../controllers/userControllers.js';
import isAdmin from '../middleware/checkRole.js';

const userRouter = express.Router();

userRouter.get('/:id', getUserInfo);
userRouter.get('/', isAdmin, getAllUsers);

export default userRouter;
