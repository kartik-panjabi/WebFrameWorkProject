/**
 * Middleware to allow only logged-in admins (role: admin)
 */
const isAdmin = (req, res, next) => {
    console.log('isAdmin middleware triggered');
    console.log('req.user:', req.user);
    if (!req.user) {
        return res.status(401).redirect('/error?message=Not%20logged%20in');
    }
    if (req.user.role !== 'admin') {
        return res.status(403).redirect('/error?message=Access%20forbidden:%20Admins%20only');
    }
    next(); // Admin is authorized
};

module.exports = isAdmin;
