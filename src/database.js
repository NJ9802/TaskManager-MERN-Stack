const mongoose = require("mongoose");

const URI = process.env.URI;

mongoose
  .connect(URI)
  .then((db) => console.log("DB is conected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
