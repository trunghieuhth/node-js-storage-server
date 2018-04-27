/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const httpStatus = require('http-status');
const File = require('../models/file.model');
const APIError = require('../helpers/APIError');
const { TYPE } = require('../../config/vars');

/**
 * POST /images
 * Upload a new image
 * @param {object} req.file - Image details
 * @param {string} req.headers.host - Host
 */
exports.postUpload = async (req, res, next) => {
  try {
    // Check file uploaded success
    if (!req.file) {
      const err = new APIError('No file uploaded', httpStatus.BAD_REQUEST, 3002);
      return next(err);
    }
    // Get domain url
    const DOMAIN_URL = req.headers.host;
    // Create new file
    const file = new File();
    file.type = TYPE.IMAGE;
    file.originalName = req.file.originalname;
    file.fileName = req.file.filename;
    file.mimeType = req.file.mimetype;
    file.fileQuality.original.url = `${DOMAIN_URL}/${req.file.path.replace(/\\\\/g, '/')}`;
    file.fileQuality.original.size = req.file.size;

    const fileSaved = await file.save();
    res.status(httpStatus.CREATED).json(fileSaved);
  } catch (err) {
    next(err);
  }
};
