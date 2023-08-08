const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { badRequestError, authenticationError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    throw new badRequestError("Please provide the credentials.");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new authenticationError("Invalid Credentials.");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new authenticationError("Invalid Credentials.");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
module.exports = { login, register };
