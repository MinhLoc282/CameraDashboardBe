import Camera from '../models/Camera.js';

export const getCameras = async (req, res) => {
  try {
    const cameras = await Camera.find();

    if (!cameras || cameras.length === 0) {
      return res.status(404).json({ msg: 'Cameras not found' });
    }

    res.status(200).json(cameras);
  } catch (e) {
    res.status(500).json('Error when getting cameras');
  }
};

export const addCamera = async (req, res) => {
  try {
    const {
      serial, homeId, connection, securityLevel,
    } = req.body;

    const newCamera = new Camera({
      serial,
      homeId,
      connection,
      securityLevel,
    });

    const camera = await newCamera.save();

    res.status(201).json({ data: camera });
  } catch (error) {
    switch (error.code) {
      case 11000:
        res.status(409).json('Duplicate serial number');
        break;
      default:
        res.status(500).json({ error });
        break;
    }
  }
};
