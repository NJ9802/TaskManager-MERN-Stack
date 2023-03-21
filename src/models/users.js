const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username exist!"],
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
    unique: false,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  admin: { type: Boolean, require: [false] },
});

module.exports = mongoose.model("User", UserSchema);
