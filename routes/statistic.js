import express from 'express';

import {
  getStatistics, addStatistic, markAsReadedStatistics, removeStatistics,
} from '../controllers/statisticControllers.js';

const statisticRouter = express.Router();

statisticRouter.get('/statistics', getStatistics);
statisticRouter.post('/statistics', addStatistic);
statisticRouter.put('/statistics/mark-read', markAsReadedStatistics);
statisticRouter.delete('/statistics', removeStatistics);

export default statisticRouter;
