const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const { mongoose } = require("./database");

const app = express();

// Setting
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/tasks", require("./routes/tasks.routes"));
app.use("/", require("./routes/auth.routes"));

// Static
app.use(express.static(path.join(__dirname, "public")));

// Starting the Server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
