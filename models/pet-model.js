const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const petSchema = new Schema({
    name: String,
    profileImg: String,
    bio: String,
    notes: String,
  usertype: {
    type: String, 
    enum: ["Dog", "Cat", "Rodent", "Fish", "Bird"], 
    default:""
    },

}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;