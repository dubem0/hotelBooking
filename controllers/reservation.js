const { Reservation } = require('../models/reservation');
const { Room } = require('../models/rooms');
const jwt = require('jsonwebtoken');

// Reservation controllers
const createReservation = async (req, res) => {
    try {
      const room = await Room.findById(req.body.roomId);
      if (!room) throw new Error('Room not found');

      const checkIn = new Date(req.body.checkIn);
      const checkOut = new Date(req.body.checkOut);
      // 1000 * 60 * 60 * 24 converts the number of milliseconds in a day. There are 1000 milliseconds
      // in a second, 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day.
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const totalPrice = nights * room.price;
      // Create a new reservation with the user's ID included
      const reservation = new Reservation({
        roomId: room._id,
        checkIn,
        checkOut,
        user: req.body.userId, // req.user
        guestName: req.body.guestName,
        guestEmail: req.body.guestEmail,
        totalPrice
      });

      await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const reservations = await Reservation.find({ user: userId })
      .populate("room", { name: 1, price: 1 })
      .select('-user') // exclude the user field from the response
      .sort({ checkIn: 1 }); // sort by check-in date in ascending order

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
const getAllReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find()
      .populate("room", {name: 1, price: 1})
      res.render('reservations', { reservations });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
const getReservationById = async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) throw new Error('Reservation not found');
      res.json(reservation);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

// const updateReservationById = async (req, res) => {
//     try {
//       const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//       });
//       if (!reservation) throw new Error('Reservation not found');
//       res.json(reservation);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
// };

const updateReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) throw new Error('Reservation not found');

    if (reservation.user.toString() !== req.user.id) {
      throw new Error('Not authorized to update this reservation');
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

  
// const deleteReservationById = async (req, res) => {
//     try {
//       const reservation = await Reservation.findByIdAndDelete(req.params.id);
//       if (!reservation) throw new Error('Reservation not found');
//       res.status(204).end();
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
// };

const deleteReservationById = async (req, res) => {
  try {
    const userId = req.user.id;
    const reservation = await Reservation.findOneAndDelete({_id: req.params.id, user: userId});
    if (!reservation) throw new Error('Reservation not found or user not authorized');
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
    getAllReservations,
    createReservation,
    deleteReservationById,
    getReservationById,
    updateReservationById,
    getUserReservations
}