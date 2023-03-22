// const { Hotel } = require('../models/hotels');

// // Hotel controllers
// const createHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.create(req.body);
//     res.status(201).json(hotel)

//   } catch (err) {
//     res.status(400).json({ message: error.message });
//     }
// };

// const getHotels = async (req, res) => {
//   try {
//       const hotel = await Hotel.find();
//       if (!hotel) throw new Error('Hotel not found');
//       res.json(hotel);
//   } catch (error) {
//       res.status(404).json({ message: error.message });
//   }
// };
  
// const getHotelById = async (req, res) => {
//     try {
//         const hotel = await Hotel.findById(req.params.id);
//         if (!hotel) throw new Error('Hotel not found');
//         res.json(hotel);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };
  
// const updateHotelById = async (req, res) => {
//     try {
//         const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         });
//         if (!hotel) throw new Error('Hotel not found');
//         res.json(hotel);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// const deleteHotelById = async (req, res) => {
//   try {
//       const hotel = await Hotel.findByIdAndRemove(req.params.id);
//       if (!hotel) throw new Error('Hotel not found');
//       res.json("hotel deleted successfully");
//   } catch (error) {
//       res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {
//   getHotelById,
//   createHotel,
//   updateHotelById,
//   deleteHotelById,
//   getHotels
// }
