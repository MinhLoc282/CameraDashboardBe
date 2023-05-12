import express from 'express';

import { getCameras, addCamera } from '../controllers/cameraControllers.js';

const cameraRouter = express.Router();

cameraRouter.get('/cameras', getCameras);
cameraRouter.post('/cameras', addCamera);

export default cameraRouter;
