const mongoose = require('mongoose');

// Define schema for Room
const RoomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String,
    required: true
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservations'
  }
});

const Room = mongoose.model('rooms', RoomSchema);

// Export models
module.exports = { Room };