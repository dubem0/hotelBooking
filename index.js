const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./database/db");
// require("./authentication/middleware") // Signup and login authentication middleware
const resRoute = require('./routes/reservation');
const roomRoute = require('./routes/rooms');
const userRoute = require('./routes/users');
const bcrypt = require('bcrypt')
// const authRouter = require('./routes/auth');
const { Users } = require("./models/users")
const LocalStrategy = require('passport-local').Strategy;
require("dotenv").config();
const passport = require('passport')
const session = require("express-session")
const app = express();

const port = process.env.PORT;
// Connect to MongoDB
db.connectToMongoDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
})); // session secret

app.use(passport.initialize());
app.use(passport.session());


// Set up the local strategy for Passport.js
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Users.findOne({ username: username });
    if (!user) { return done(null, false); }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}));



// Set up Passport.js serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// app.use("/hotels", hotelRoute);
app.use("/reservation", resRoute);
app.use("/rooms", roomRoute);
app.use("/users", userRoute);

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

app.get('/', (req, res) => {
  console.log(req.user)
  res.render('index', {
    user: req.user
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});


app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/rooms', (req, res) => {
  res.render('rooms', {user: req.user});
});

app.post('/signup', (req, res) => {
  const { username, email, phone, password } = req.body;
  const user = new Users({ username, email, phone, password });
  user.save()
    .then(() => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/register');
    });
});


app.get('/restaurant', (req, res) => {
  res.render('restaurant', {
    user: req.user 
  });
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { 
    user: req.user 
  });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// route to handle logging out the user
app.get('/logout', (req, res) => {
  req.logout(() => {  // passport middleware will clear the session and log out the user
    res.redirect('/');  // redirect to the homepage
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/restaurant', (req, res) => {
  res.render('restaurant');
});


// Handle errors.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.use (function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 400);
  res.json({error: err.message});
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
