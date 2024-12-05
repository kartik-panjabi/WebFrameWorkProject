const jwt = require('jsonwebtoken');
const protect = async (req, res, next) => {
    let token;

    console.log('Protect Middleware Triggered');

    // Check if the Authorization header is present and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('Authorization header found:', req.headers.authorization);

        try {
            // Extract the token
            token = req.headers.authorization.split(' ')[1];
            console.log('Extracted token:', token);

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded JWT:', decoded);

            // Attach user info to the request
            req.user = { id: decoded.id, username: decoded.username };
            console.log('User attached to request:', req.user);

            next(); // Proceed to the next middleware or route
        } catch (err) {
            console.error('Error verifying token:', err.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.warn('Authorization header missing or invalid');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
