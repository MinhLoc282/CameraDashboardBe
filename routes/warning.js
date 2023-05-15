import express from 'express';

import {
  getWarnings,
  addWarning,
  markAsReadedWarnings,
  removeWarnings,
} from '../controllers/warningControllers.js';

const warningRouter = express.Router();

warningRouter.get('/warnings', getWarnings);
warningRouter.post('/warnings', addWarning);
warningRouter.put('/warnings/mark-read', markAsReadedWarnings);
warningRouter.delete('/warnings', removeWarnings);

export default warningRouter;
