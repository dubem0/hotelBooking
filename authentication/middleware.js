// Importing required modules

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { Users } = require ("../models/users");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Passport middleware to handle JSON Web Token authentication
passport.use(
    new JWTstrategy(
        {
            // This option sets the secret or key used to sign and verify the JWT. In this case, the value is set to process.env.JWT_SECRET
            secretOrKey: process.env.JWT_SECRET,
            // This option sets the method used to extract the JWT from the incoming request. In this case, it's set to 
            // ExtractJWT.fromAuthHeaderAsBearerToken(), which means the JWT will be extracted from the Authorization header of the request as a bearer token. 
            // Bearer tokens are a type of token used for authentication, and they are commonly used with JWT-based authentication strategies.
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                // Verify if user exists in token
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// Passport middleware to handle user registration
passport.use(
    "signup", 
    new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const username = req.body.username;
            const phone = req.body.phone;
            // Create new user and return it
            const user = await Users.create({ username, phone, email, password });
            return done(null, user);

        } catch (error) {
            done(error);
        }
    }
));


// Passport middleware to handle user login
passport.use("login", new localStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {
        try {
            // Find user by email
            const user = await Users.findOne({ email });

            // Return error if user does not exist
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            // Check if password is valid
            const validUser = await user.isAuthenticated(password);

            // Return error if password is invalid
            if(!validUser) {
                return done(null, user, { message: "Wrong password"});
            }

            // Return success message and user information
            return done(null, user, {message: "login successful"});
        } catch (error) {
            return done(error);
        }
    }
));

  // serialize and deserialize the user object to and from the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });

// This code defines the Passport middleware functions for handling user authentication using local strategy and JSON Web Token.
// The 'passport' module is imported to use its authentication middleware.
// 'localStrategy' is used for user authentication using email and password.
// 'JWTstrategy' is used for JSON Web Token authentication.
// 'Users' model is used to interact with the database.
// 'ExtractJWT' is used to extract JSON Web Token from the authorization header.




