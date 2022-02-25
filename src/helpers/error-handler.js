const errorHandler = (error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    return res.status(401).send(error.message);
  }
  if (error.name === "ValidationError") {
    return res.status(401).send(error.message);
  }
  return res.status(500).send(error);
};

module.exports = errorHandler;
