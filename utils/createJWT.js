import jwt from 'jsonwebtoken';

function createJWT(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export default createJWT;
