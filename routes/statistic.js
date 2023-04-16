import express from 'express';

import { getStatistics } from '../controllers/statisticControllers.js';

const statisticRouter = express.Router();

statisticRouter.get('/statistics', getStatistics);

export default statisticRouter;
