import User from '../models/User.js';

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const { id, avatar, username } = user;
    res.status(200).json({ id, avatar, username });
  } catch (e) {
    res.status(500).json('Error when getting user info');
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json('Error when getting all users');
  }
};
