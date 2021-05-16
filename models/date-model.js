const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const dateSchema = new Schema({
    avdatestart: [{ type: Date }],
    avdateend: [{ type: Date }],
    needdatestart: [{ type: Date }],
    needdateend: [{ type: Date }],
    owner: {type:Schema.Types.ObjectId, ref: "User"},

}, 
{
  timestamps: true
});

const Dates = mongoose.model('Dates', dateSchema);
module.exports = Dates;