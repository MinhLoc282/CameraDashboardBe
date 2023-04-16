import Location from '../models/Location.js';

export const getLocations = async (req, res) => {
  try {
    const Locations = await Location.find();

    if (!Locations || Locations.length === 0) {
      return res.status(404).json({ msg: 'Locations not found' });
    }

    res.status(200).json(Locations);
  } catch (e) {
    res.status(500).json('Error when getting Locations');
  }
};

export const addLocation = async (req, res) => {
  try {
    const newLocation = new Location({
      id: req.body.id,
      serial: req.body.serial,
      profile: req.body.profile,
      activate: req.body.activate,
    });

    const location = await newLocation.save();

    res.status(200).json({ data: location });
  } catch (error) {
    switch (error.code) {
      case 11000:
        res.status(409).json('duplicate');
        break;
      default:
        res.status(500).json({ error });
        break;
    }
  }
};
