/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const httpStatus = require('http-status');
const { accessKey } = require('../../config/config');
const APIError = require('../helpers/APIError');

/**
 * Authenticate access key
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.query.key !== accessKey) {
    const err = new APIError('Access denied', httpStatus.UNAUTHORIZED, 2003);
    return next(err);
  }
  next();
};
