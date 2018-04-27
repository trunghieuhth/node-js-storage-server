/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const multer = require('multer');
const path = require('path');
const httpStatus = require('http-status');
const uuidv1 = require('uuid/v1');
const { LIMIT_FILE_SIZE } = require('./vars');
const APIError = require('../server/helpers/APIError');

// Storage configs
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './static/images');
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv1().replace(/-/g, '_')}_o${extName}`);
  },
});

// Limit configs
const limits = {
  fileSize: LIMIT_FILE_SIZE,
};

// File filter
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|bmp/;
  const mimeType = fileTypes.test(file.mimetype);
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new APIError(
    `File upload only supports the following types - ${fileTypes}`,
    httpStatus.BAD_REQUEST,
    3001,
  ));
};

module.exports = multer({ storage, limits, fileFilter });
