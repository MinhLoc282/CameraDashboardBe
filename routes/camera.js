import express from 'express';

import { getCameras } from '../controllers/cameraControllers.js';

const cameraRouter = express.Router();

cameraRouter.get('/cameras', getCameras);

export default cameraRouter;
