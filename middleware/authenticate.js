const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { authenticationError } = require("../errors/authenticationError");

const authenticate = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new authenticationError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to the job route
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new authenticationError("Authentication Invalid");
  }
};
module.exports = authenticate;
