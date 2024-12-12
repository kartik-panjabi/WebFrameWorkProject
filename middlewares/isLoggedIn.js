const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET ;

/**
 * Middleware to verify if the user is logged in (has a valid token)
 */
const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        //redirect to error page
        return res.status(401).redirect('/error?message=Login%20Required');
    }

   
    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify token
        req.user = decoded; // Attach decoded token data to req.user
        next(); // User is logged in, proceed to next middleware
    } catch (error) {
       return res.status(401).redirect('/error?message=Invalid%20or%20expired%20token');
    }
};

module.exports = isLoggedIn;
