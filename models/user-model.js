const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profileImg: {
      type: String,
      default:
        "https://res.cloudinary.com/defncxxxy/image/upload/v1620846241/Pawtell/file_yot0h7.jpg",
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    usertype: {
      type: String,
      enum: ["Pet Owner", "Pet Sitter"],
      default: "Pet Owner",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
