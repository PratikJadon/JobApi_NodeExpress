const { CustomAPIError } = require("../errors/CustomError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Someting went Wrong Try Again.",
  };
  // if (err instanceof CustomAPIError) {
  //   res.status(err.statusCode).json(err.message);
  // }
  if (err.code && err.code === 11000) {
    CustomError.message = `Duplicate value enter for ${Object.keys(
      err.keyValue
    )}`;
    CustomError.statusCode = 400;
  }
  if (err.name === "CastError") {
    CustomError.message = `No item Found with Id ${err.value}`;
    CustomError.statusCode = 404;
  }
  if (err.name === "ValidationError") {
    CustomError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    CustomError.statusCode = 400;
  }
  res.status(CustomError.statusCode).json(CustomError.message);
};

module.exports = errorHandler;
