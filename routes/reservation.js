const express = require('express');
const session = require('express-session');
const passport = require('passport');

const {
    getAllReservations,
    createReservation,
    deleteReservationById,
    getReservationById,
    updateReservationById,
    getUserReservations
} = require("../controllers/reservation")

const resRouter = express.Router()

// Initialize session middleware
resRouter.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
  }));
  
  // Initialize passport middleware
  resRouter.use(passport.initialize());
  resRouter.use(passport.session());


resRouter.get("/", getAllReservations);
resRouter.get("/:id", getReservationById);
resRouter.patch("/:id", updateReservationById);
resRouter.post("/", createReservation);
resRouter.get("/user/:id", getUserReservations);
resRouter.delete("/:id", deleteReservationById);

module.exports = resRouter;