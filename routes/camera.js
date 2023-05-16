import express from 'express';

import isAuth from '../middleware/checkRole.js';
import { getCameras, addCamera } from '../controllers/cameraControllers.js';

const cameraRouter = express.Router();

cameraRouter.get('/cameras', isAuth, getCameras);
cameraRouter.post('/cameras', addCamera);

export default cameraRouter;
