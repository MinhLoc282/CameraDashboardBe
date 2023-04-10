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
    { expiresIn: '1h' },
  );
  return token;
};
