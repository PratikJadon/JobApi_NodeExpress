const { authenticationError } = require("./authenticationError");
const { badRequestError } = require("./badRequestError");
const { CustomAPIError } = require("./CustomError");
const { notFoundError } = require("./notFoundError");

module.exports = {
  authenticationError,
  badRequestError,
  CustomAPIError,
  notFoundError,
};
