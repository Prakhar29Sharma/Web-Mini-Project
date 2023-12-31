const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    if (req.headers.authorization === undefined) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;