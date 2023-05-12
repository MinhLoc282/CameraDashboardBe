import express from 'express';

import { getLocations, addLocation } from '../controllers/locationControllers.js';

const locationRouter = express.Router();

locationRouter.get('/locations', getLocations);
locationRouter.post('/locations', addLocation);

export default locationRouter;
