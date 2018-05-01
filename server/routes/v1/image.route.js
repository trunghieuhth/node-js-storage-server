/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const express = require('express');
const validate = require('express-validation');
const imageCtrl = require('../../controllers/image.controller');
const upload = require('../../../config/multer-upload-image');
const auth = require('../../middlewares/auth.middleware');
const paramValidation = require('../../../config/param-validation');

const router = express.Router();

/** GET /images?page=<NUMBER>&limit=<NUMBER> - Get list images */
router.route('/').get(validate(paramValidation.getImages), auth.isAuthenticated, imageCtrl.getImages);

/** GET /images/:imageId - Get image details */
router.route('/:imageId').get(validate(paramValidation.getImage), auth.isAuthenticated, imageCtrl.getImage);

/** POST /images - Upload a new image */
router.route('/').post(auth.isAuthenticated, upload.single('file'), imageCtrl.postUpload);

module.exports = router;
