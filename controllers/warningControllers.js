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

export const markAsReadedWarnings = async (req, res) => {
  try {
    const { warningIds } = req.body;

    if (!Array.isArray(warningIds)) {
      return res.status(400).json({ msg: 'Invalid warningIds format' });
    }

    const warnings = await Warning.find({ _id: { $in: warningIds } });

    const savePromises = warnings.map((warning) => {
      const warningCopy = [...warning];
      warningCopy.isRead = true;
      return warningCopy.save();
    });
    await Promise.all(savePromises);

    res.status(200).json({ msg: 'Warnings marked as read' });
  } catch (e) {
    res.status(500).json({ msg: 'Error when marking warnings as read' });
  }
};

export const removeWarnings = async (req, res) => {
  try {
    const { warningIds } = req.body;

    if (!Array.isArray(warningIds)) {
      return res.status(400).json({ msg: 'Invalid warningIds format' });
    }

    const deleteResult = await Warning.deleteMany({ _id: { $in: warningIds } });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ msg: 'Warnings not found' });
    }

    res.status(200).json({ msg: 'Warnings removed successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
