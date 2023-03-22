const express = require('express');
const passport = require('passport');

const {
    deleteRoomById,
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoomById,
    upload
} = require("../controllers/rooms")

const roomRouter = express.Router()


roomRouter.get("/", getAllRooms);
roomRouter.get("/:id", passport.authenticate("jwt", { session: false }), getRoomById);
roomRouter.patch("/:id", passport.authenticate("jwt", { session: false }), updateRoomById);
roomRouter.post("/", upload.single("imgUrl"), createRoom);
roomRouter.delete("/:id", passport.authenticate("jwt", { session: false }), deleteRoomById);

module.exports = roomRouter;