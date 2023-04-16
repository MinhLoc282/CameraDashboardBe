import express from 'express';

import { getWarnings } from '../controllers/warningControllers.js';

const warningRouter = express.Router();

warningRouter.get('/warnings', getWarnings);

export default warningRouter;
