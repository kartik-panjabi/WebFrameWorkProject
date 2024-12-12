const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).redirect('/error?message=Please%20provide%20all%20required%20fields%20(username%2C%20email%2C%20password).');
    }

    try {
        // Check if the user already exists with the same username or email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).redirect('/error?message=User%20already%20exists%20with%20this%20username%20or%20email');
        }

        // Create a new user (do not hash the password here)
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Send success response
        res.status(201).redirect('/api/users/login?message=User%20registered%20successfully');
       
    } catch (err) {
        res.redirect('/error?message=' + encodeURIComponent('Error registering user: ' + err.message));
    }
};


// Login existing user and generate JWT
const loginUser = async (req, res) => {
        const { username, password } = req.body;

        console.log('Login request received:', req.body);

        try {
            // Check if the user exists
            const user = await User.findOne({ username });
            console.log('User found in database:', user);

            if (!user) {
                console.warn('User not found');
                return res.status(400).redirect('/error',{ message: 'User not found' });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', isMatch);

            if (!isMatch) {
                console.warn('Password did not match');
                return res.status(400).redirect('./',{ message: 'Invalid credentials' });
            }

            const role = username === 'kp123456' ? 'admin' : 'user';

            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, username: user.username, role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            console.log('Generated JWT:', token);


            // Send token back to the client
            // Option 1: Send as a cookie (more secure)
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'Strict',
            });

             res.setHeader('Authorization', `Bearer ${token}`);
            // Redirect to protected route
            res.status(200);
            res.redirect(`/listings?message=${encodeURIComponent('Login successful')}`);

        
        } catch (err) {
            console.error('Error logging in user:', err.message);
            res.status(500);
            res.redirect(`/error?message=${encodeURIComponent('Error logging in user')}`);

        }
    };

module.exports = { registerUser, loginUser };
