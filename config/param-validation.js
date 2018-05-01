/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const Joi = require('joi');

module.exports = {
  // GET /api/{{version}}/images
  getImages: {
    query: {
      page: Joi.number(),
      limit: Joi.number(),
    },
  },
  // GET /api/{{version}}/images/:imageId
  getImage: {
    params: {
      imageId: Joi.string().hex(),
    },
  },
};
