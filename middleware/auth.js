const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ status: 'error', error: 'Unauthorized access' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'error', error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken };
