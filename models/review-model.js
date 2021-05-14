const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String, maxlength: 200 },
  rating: [{ type: Number }],
});

module.exports = model("Review", reviewSchema);
