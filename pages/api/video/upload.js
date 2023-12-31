import multer from 'multer';
import fs from 'fs';
import path from 'path';

const nc = require('next-connect');
const Video = require('../../../db/models/videoModel');
const authController = require('../../../authController');

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir =
      process.env.NODE_ENV === 'development' ? `${__dirname}` : '/tmp';
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '' + Date.now() + '' + file.originalname);
  },
});

let upload = multer({ storage: storage }).single('file');

handler.use(upload);

import { google } from 'googleapis';

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFilename: path.resolve('./driveToken.json'),
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  return auth;
};

const delteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ['1AKI0qAZArDcTIWOEqgmGoJZyaySg3ntF'],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: 'v3', auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
  });

  delteFile(file.path);
  return response;
};

handler.post(
  authController.protect,
  authController.restrictTo('admin', 'coach'),
  async (req, res, next) => {
    if (
      req.file.mimetype !== 'video/mp4' &&
      req.file.mimetype !== 'video/mkv' &&
      req.file.mimetype !== 'video/avi' &&
      req.file.mimetype !== 'video/mov' &&
      req.file.mimetype !== 'video/wmv' &&
      req.file.mimetype !== 'video/flv' &&
      req.file.mimetype !== 'video/avchd' &&
      req.file.mimetype !== 'video/webm' &&
      req.file.mimetype !== 'video/mpeg-2'
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please upload a valid video file',
      });
    }
    // console.log(req.body.categories);
    //Get auth from Google Drive
    let auth = await authenticateGoogle();

    //check if the extension of the file is valid video format

    // Upload video to Google Drive and obtain
    //  response of the file uploaded.
    if(!req.file || !req.body.title || !req.body.description)
    {
      return next(new AppError('Please provide all the details', 400));
    }
    let file_response = await uploadToGoogleDrive(req.file, auth);
    // console.log(file_response);

    // Create a new Video based on the req.body parameters
    const newVideo = await Video.create({
      title: req.body.title,
      description: req.body.description,
      gDriveID: file_response.data.id,
      uploader: req.user._id,
    });

    res.status(200).send({ status: 'success', data: { newVideo } });
    // res.status(200).json({ status: 'success', message: 'dummy message' });
  }
);

export default handler;