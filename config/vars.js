/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

module.exports = {
  TYPE: {
    IMAGE: 'image',
    VIDEO: 'video',
    PDF: 'pdf',
    UNKNOWN: 'unknown',
  },
  // Limit size of file uploaded (5MB) (5 * 1024 * 1024)
  LIMIT_FILE_SIZE: 5242880,
  // Limit list elements in one page when using GET api
  DEFAULT_PAGE_LIMIT: 10,
};
