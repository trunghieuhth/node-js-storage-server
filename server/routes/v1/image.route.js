/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const express = require('express');
const imageCtrl = require('../../controllers/image.controller');
const upload = require('../../../config/multer-upload-image');
const auth = require('../../middlewares/auth.middleware');

const router = express.Router();

/** POST /images - Upload a new image */
router.route('/').post(auth.isAuthenticated, upload.single('file'), imageCtrl.postUpload);

module.exports = router;
