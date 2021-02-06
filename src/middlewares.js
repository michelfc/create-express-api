/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  if (err.name === 'UnauthorizedError') {
    return (res.status(401).send({ message: err.message }));
  } else {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }
}

module.exports = {
  errorHandler
};
