const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  birthDate: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true, 
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;