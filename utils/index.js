import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = 'secretJWT';

export const HashFunction = async ({ password }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateJwtToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: '24h' }
  );
  return token;
};

export const verifyToken = (token, secret = jwtSecret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
