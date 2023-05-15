import express from 'express';

import { getVideos } from '../controllers/videosController.js';

const videoRouter = express.Router();

videoRouter.get('/videos/:id', getVideos);

export default videoRouter;
