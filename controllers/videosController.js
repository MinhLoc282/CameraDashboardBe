import rangeParser from 'range-parser';
import axios from 'axios';

export const getVideos = async (req, res) => {
  try {
    const videoUrl = 'https://rr5---sn-npoe7ns6.googlevideo.com/videoplayback?expire=1683561534&ei=3sdYZMWBKYbaigSp9JPgAQ&ip=162.212.152.195&id=o-APabFAWvZaNUmh-NRSMgNMza5pDmbYdUih6_nbCLfaZ0&itag=22&source=youtube&requiressl=yes&spc=qEK7B95_qzm_r3xP7WW3l6Imr7Z9GGU&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=488.431&lmt=1682750849531233&fexp=24007246&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMVPCgMmDshxLsoPbhur2-YDN-ow2fpYdogEl3_Jn_N3AiAqOXvGFntVo62JoHjHHl88awCayPGFwO3WR_JzSoFP2A%3D%3D&rm=sn-gjo-vgql7l,sn-npo6s76&req_id=120e66d5d9bca3ee&cm2rm=sn-p5qe767l&redirect_counter=3&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=hE&mip=42.117.100.7&mm=34&mn=sn-npoe7ns6&ms=ltu&mt=1683549164&mv=m&mvi=5&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgNR1gY5sYTHoH68vibVa_PtCi8meB-qt7dHVvppGe9LICIHNGA6c6QDgha71HiCNhbfO8d5WJelbNsZXjgzHFfoCX';

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
