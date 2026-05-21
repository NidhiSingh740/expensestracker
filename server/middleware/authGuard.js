
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Pull authorization token out of incoming request headers
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access denied. No session token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Splits "Bearer <token>"
  if (!token) {
    return res.status(401).json({ success: false, message: 'Malformatted token signature.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Appends verified userId directly into request scope
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Session expired or invalid token.' });
  }
};