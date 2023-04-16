import express from 'express';

import { getLocations } from '../controllers/locationControllers.js';

const locationRouter = express.Router();

locationRouter.get('/locations', getLocations);

export default locationRouter;
