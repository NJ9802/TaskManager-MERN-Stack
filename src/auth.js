const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    // check if the token matches the supposed origin
    const user = await jwt.verify(token, "RANDOM-TOKEN");

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (err) {
    res.status(401).json({ err: new Error("Invalid Request") });
  }
};
