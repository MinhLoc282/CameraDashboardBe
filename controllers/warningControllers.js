import Warning from '../models/Warning.js';

export const getWarnings = async (req, res) => {
  try {
    const Warnings = await Warning.find();

    if (!Warnings || Warnings.length === 0) {
      return res.status(404).json({ msg: 'Warnings not found' });
    }

    res.status(200).json(Warnings);
  } catch (e) {
    res.status(500).json('Error when getting Warnings');
  }
};

export const addWarning = async (req, res) => {
  try {
    const newWarning = new Warning({
      content: req.body.content,
      location: req.body.location,
      serial: req.body.serial,
      securityLevel: req.body.securityLevel,
      playback: req.body.playback,
    });

    const warning = await newWarning.save();
    res.status(200).json({ data: warning });
  } catch (error) {
    res.status(500).json({ error });
  }
};
