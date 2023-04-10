import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { HashFunction, generateJwtToken } from '../utils/index.js';

export const login = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email },
    );

    if (!user) return res.status(401).send('User not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword) {
      return res.status(401).json('Wrong password');
    }
    const token = generateJwtToken(user);
    res.status(200).json(token);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

export const register = async (req, res) => {
  try {
    const hashedPassword = await HashFunction({
      password: req.body.password,
    });
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json({ data: user });
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
