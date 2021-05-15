const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const petSchema = new Schema({
    name: String,
    imageUrl: String,
    bio: String,
    notes: String,
    owner: {type:Schema.Types.ObjectId, ref: "User"},
  // pettype: {
  //   type: String,
  //   enum: ["Dog", "Cat", "Rodent", "Fish", "Bird"], 
  //   default:""
  //   },

}, 
{
  timestamps: true
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;