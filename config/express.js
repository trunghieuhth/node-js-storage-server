/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');

const config = require('./config');
const winstonInstance = require('./winston');
const routes = require('../server/index.route');
const APIError = require('../server/helpers/APIError');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross-Origin Resource Sharing
app.use(cors());

// Enable detailed API logging in DEVELOPMENT mode
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // Optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// Publish assets folder
app.use('/static', express.static('static'));

// Mount all routes on /api path
app.use('/api/v1', routes);

// If error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // Validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    // TODO: Handle error code [ValidationError]
    const error = new APIError(unifiedErrorMessage, err.status, 3000, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, 1001, err.isPublic);
    return next(apiError);
  }
  // TODO: Handle other error code
  return next(err);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API unknown', httpStatus.NOT_FOUND, 1002);
  return next(err);
});

// Log error in winston transports except when executing production suite
// if (config.env !== 'production') {
//   app.use(expressWinston.errorLogger({
//     winstonInstance,
//   }));
// }

// Error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    code: err.code,
    message: err.isPublic ? err.message : httpStatus[err.status],
    // stack: config.env === 'development' ? err.stack : {},
  }));

module.exports = app;
