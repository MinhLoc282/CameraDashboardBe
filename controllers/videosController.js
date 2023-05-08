import rangeParser from 'range-parser';
import axios from 'axios';

export const getVideos = async (req, res) => {
  try {
    const videoId = req.params.id;
    const data = await axios.get(
      `https://api.trending.fm/media-cache/22/${videoId}`,
    );
    const videoUrl = data.data.url;

    const response = await axios.get(videoUrl, {
      responseType: 'stream',
    });

    const fileSize = response.headers['content-length'];
    const videoRange = req.headers.range;
    const videoChunks = rangeParser(fileSize, videoRange);

    if (videoChunks === -1) {
      res.status(416).send('Requested range not satisfiable');
    }

    const videoStream = response.data;
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', fileSize);
    res.setHeader(
      'Content-Range',
      `bytes ${videoChunks.start}-${videoChunks.end}/${fileSize}`,
    );
    res.setHeader('Accept-Ranges', 'bytes');

    videoStream.pipe(res);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};
