const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token', status: 'error' });
            }
            req.user = { userID: decoded.userID }; // Attach user info to req.user
            next();
        });
    } else {
        res.status(401).json({ message: 'Authentication token missing', status: 'error' });
    }
};

module.exports = { authenticate };
