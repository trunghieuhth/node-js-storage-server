/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const Joi = require('joi');

module.exports = {
  // GET /api/{{version}}/{{fileType}}/:fileId
  getFile: {
    params: {
      fileId: Joi.string().hex().required(),
    },
  },
};
