/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  fileQuality: {
    original: {
      url: { type: String, default: null },
      size: { type: Number, default: null },
    },
    high: {
      url: { type: String, default: null },
      size: { type: Number, default: null },
    },
    medium: {
      url: { type: String, default: null },
      size: { type: Number, default: null },
    },
    low: {
      url: { type: String, default: null },
      size: { type: Number, default: null },
    },
  },
  fileName: {
    type: String,
    default: null,
  },
  originalName: {
    type: String,
    default: null,
  },
  mimeType: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
}, { timestamp: true });

/**
 * Modify the output JSON
 *  - Change "_id" to "id"
 *  - Remove version "__v"
 */
FileSchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('File', FileSchema);
