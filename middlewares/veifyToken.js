const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Log cookies and Authorization header to see what you're getting in the request
    console.log("Cookies: ", req.cookies);
    const authHeader = req.headers.authorization;
    console.log("Authorization Header: ", authHeader);

    // First check for token in cookies
    let token = req.cookies['token']; // If token is sent as a cookie
    if (token) {
        console.log("Token found in cookies:", token);
    }

    // If not found in cookies, check the Authorization header
    if (!token && authHeader) {
        token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
        console.log("Token found in Authorization header:", token);
    }

    // If no token in either cookies or headers, send unauthorized error
    if (!token) {
        return res.status(401).json({ error: 'User not authorized, please login' });
    }

    // Now verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        // Attach decoded payload to the request object
        req.user = decoded;
        console.log("Decoded token:", decoded);
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;
