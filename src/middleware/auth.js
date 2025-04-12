const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const SECRET = process.env.JWT_SECRET || 'access_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Expect: "Bearer TOKEN"

  if (!token) return res.sendStatus(401);
  logger.info('Jwt token received');

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err){
      logger.info('Jwt token is not valid');
      return res.sendStatus(403);
    }

    logger.info('Jwt token is  valid');
    req.user = decoded;
    next();
  });

};

module.exports = authenticateToken;
