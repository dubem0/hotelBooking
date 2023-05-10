const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { Room } = require('../models/rooms');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds

// Configure multer to use Cloudinary as storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'deeshotels'
  }
});

// Configure multer for file uploads
const upload = multer({ storage: storage });

// Room controllers
const createRoom = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      timestamp: timestamp,
    })

    // Save room to MongoDB with Cloudinary URL
    const room =  await Room.create({
      ...req.body,
      imgUrl: result.secure_url
    });
    
    res.status(201).json(room);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

  
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.render("rooms", {rooms}, {user: req.user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) throw new Error('Room not found');
        res.json(room);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const updateRoomById = async (req, res) => {
    try {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!room) throw new Error('Room not found');
      res.json(room);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  
const deleteRoomById = async (req, res) => {
    try {
      const room = await Room.findByIdAndDelete(req.params.id);
      if (!room) throw new Error('Room not found');
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

module.exports = {
  deleteRoomById,
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  upload
}