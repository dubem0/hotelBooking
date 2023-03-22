const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./database/db");
require("./authentication/middleware") // Signup and login authentication middleware
const resRoute = require('./routes/reservation');
const roomRoute = require('./routes/rooms');
const userRoute = require('./routes/users');
const authRouter = require('./routes/auth');
const { Users } = require("./models/users")
require("dotenv").config();
const passport = require("passport")
const session = require("express-session")

const app = express();

const port = process.env.PORT;
// Connect to MongoDB
db.connectToMongoDB();

app.use(session({ 
  secret: 'godaddy420',
  resave: false,
  saveUninitialized: true 
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

// app.use("/hotels", hotelRoute);
app.use("/reservation", resRoute);
app.use("/rooms", roomRoute);
app.use("/users", userRoute);
app.use("/auth", authRouter);

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
