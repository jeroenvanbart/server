const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const needdateSchema = new Schema(
  {
    needdatestart: { type: Date },
    needdateend: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const NeedDates = mongoose.model("NeedDates", needdateSchema);
module.exports = NeedDates;
