const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avdateSchema = new Schema(
  {
    avdatestart: { type: Date },
    avdateend: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const AvDates = mongoose.model("AvDates", avdateSchema);
module.exports = AvDates;
