// const mongoose = require('mongoose');

// // Define schema for Hotel
// const HotelSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   rooms: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'rooms' }],
//   reservations: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'reservations' }]
// });

// // Create models for Room, Reservation and Hotel
// const Hotel = mongoose.model('hotels', HotelSchema);

// // Export models
// module.exports = {
//   Hotel
// };
