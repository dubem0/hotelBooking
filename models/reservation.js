const mongoose = require('mongoose');

// Define schema for Reservation
const ReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  guestName: {
    type: String,
    required: true
  },
  guestEmail: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number
  },
  status: {
    type: String,
    enum: ['reserved', 'checkedIn', 'checkedOut', 'cancelled'],
    default: 'reserved'
  }
});

const Reservation = mongoose.model('reservations', ReservationSchema);

// Export models
module.exports = {
    Reservation
};