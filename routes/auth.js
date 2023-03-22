const express = require('express');
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRouter = express.Router();
// Configure the session middleware
authRouter.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

authRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }), 
    async (req, res, next) => {
        // Add a success message to the session
        // req.session.success = 'Signup successful! Please log in to continue.';
        // // Redirect to the login page
        res.redirect('/login');
        // res.render('signup-success', { user: req.user });

    }
);

authRouter.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    const error = new Error('Username or password is incorrect');
                    return next(error);
                }

                req.login(user, { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, email: user.email, username: user.username };
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '23h' });
                        
                        // localStorage
                        // const userJSON = JSON.stringify(user);
                        // localStorage.setItem('user', userJSON);
                        // localStorage.setItem('token', token);
                        // localStorage.removeItem('token').

                        // Set the token as a cookie
                        res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
                       
                        // Return the user object along with the token
                        // res.send({ user, token });
                        // Redirect the user to the home page
                        res.redirect('/');

                    }
                );
            } catch (error) {
                return next(error);
            }
        }
        )(req, res, next);

    }
);

module.exports = authRouter;
