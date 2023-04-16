import Statistic from '../models/Statistic.js';

export const getStatistics = async (req, res) => {
  try {
    const Statistics = await Statistic.find();

    if (!Statistics || Statistics.length === 0) {
      return res.status(404).json({ msg: 'Statistics not found' });
    }

    res.status(200).json(Statistics);
  } catch (e) {
    res.status(500).json('Error when getting Statistics');
  }
};

export const addStatistic = async (req, res) => {
  try {
    const newStatistic = new Statistic({
      profile: req.body.profile,
      location: req.body.location,
      serial: req.body.serial,
      time: Date.now(),
    });

    const statistic = await newStatistic.save();
    res.status(200).json({ data: statistic });
  } catch (error) {
    res.status(500).json({ error });
  }
};
