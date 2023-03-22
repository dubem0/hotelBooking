const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  phone: {
    type: String,
    required: true,
  },
  reservation: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'reservations' }],
});

// U.pre is a Mongoose middleware that is called before an event. In this case, 'save' specifies that the middleware is called before a user document is saved to the database.                                                                                                                                                                        
userSchema.pre('save', async function (next) {
  // If the password property is set, hash the password before saving
  const user = this;

  // Generate a salt for the password with 10 rounds of bcrypt
  const hash = await bcrypt.hash(this.password, 10);
  const salt = bcrypt.genSaltSync(10)
  // Hash the password using the salt
  this.password = hash;
  next()
})

userSchema.methods.isAuthenticated = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

const Users = mongoose.model('users', userSchema);

module.exports = { Users };