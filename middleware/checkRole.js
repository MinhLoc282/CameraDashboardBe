import { verifyToken } from '../utils/index.js';

const getTokenFromHeaders = (req) => {
  if (
    (req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Token')
    || (req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAdmin = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  if (!token) {
    throw new Error("You're not authorized");
  }
  const decoded = verifyToken(token);

  if (decoded.email !== 'admin@gmail.com') {
    throw new Error("You're not admin");
  }

  req.payload = decoded;
  next();
};

export default isAdmin;
