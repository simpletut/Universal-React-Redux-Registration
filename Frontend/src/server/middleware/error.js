const winston = require('winston');

/* eslint-disable */
const error = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send('Something went wrong.');
}
/* eslint-enable */

export default error;