const express = require("express");
const session = require('express-session');
const passport = require('passport');

const {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../controllers/users");

const userRouter = express.Router();

userRouter.get("/", passport.authenticate("jwt", { session: false }), getUsers);
userRouter.get("/:id", passport.authenticate("jwt", { session: false }), getUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter

// const { Users } = require('../models/users');

// // get all users
// const getUsers = async (req, res) => {
//   try {
//     const users = await Users.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// }

// // get a user
// const getUserById = (req, res) => {
//    // Get the id from the URL parameters
//    const id = req.params.id

//    Users.findById(id)
//    .then(user => {
//        // If the user is found, return it with a 200 status code
//        res.status(200).json(user)
//    }).catch(err => {

//     console.log(err)
//        res.status(404).send(err)
//    })
// };

// // patch user
// const updateUserById = (req, res) => {
//     // get the id from the URL parameters
//     const id = req.params.id

//     // get the updated user data from the request body
//     const user = req.body

//     // set the lastUpdateAt to the current date
//     user.lastUpdateAt = new Date() 

//     // use the Mongoose findByIdAndUpdate method to update the user in the database
//     Users.findByIdAndUpdate(id, user, { new: true })
//     // if the update is successful, return the updated user in the response
//     .then(newUser => {
//         res.status(200).send(newUser)
//     })
//     // if there is an error, log it and return a 500 Internal Server Error response
//     .catch(err => {
//         console.log(err)
//         res.status(500).send(err)
//     })
// };

// // delete user
// const deleteUserById = (req, res) => {
//     // Get the id of the user to delete from the request parameters
//     const id = req.params.id
//     // Use the findByIdAndRemove method on the user model to delete the user with the given id
//     Users.findByIdAndRemove(id)
//     .then(user => {
//         // If the user is deleted successfully, send the deleted user back to the client
//         res.status(200).send("user deleted succesfully!")
//     }).catch(err => {
//         // If there is an error, log it and send a 500 Internal Server
//         console.log(err)
//         res.status(500).send(err)
//     })
// };


// module.exports = {
//   getUsers,
//   getUserById,
//   updateUserById,
//   deleteUserById,
//   signup,
//   login
// };