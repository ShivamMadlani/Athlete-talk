const nc = require('next-connect');
const catchAsync = require('../../../utils/catchAsync');
const Video = require('../../../db/models/videoModel');
const authController = require('../../../authController');

const handler = nc({
    onError: authController.handleError,
    onNoMatch: authController.handleNoMatch,
});

handler.get(
    authController.protect,
    catchAsync(async (req, res, next) => {
        const videos = await Video.find({})
            .populate('categories')
            .populate('uploader');

        res.status(200).json({
            status: 'success',
            results: videos.length,
            data: {
                videos,
                preferredCategories: req.user.preferredCategories,
            },
        });
    })
);

handler.delete(
    authController.protect,
    authController.restrictTo('admin', 'coach'),
    catchAsync(async (req, res, next) => {
        res.status(200).json({ status: 'success', message: 'vidoe deleted' });
    })
);

export default handler;
