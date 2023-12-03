const nc = require('next-connect');
const dbConnect = require('../../../../db/mongoose');
const User = require('../../../../db/models/userModel');
const authController = require('../../../../authController');
const AppError = require('../../../../utils/appError');
const catchAsync = require('../../../../utils/catchAsync');

const handler = nc({
    onError: authController.handleError,
    onNoMatch: authController.handleNoMatch,
});

handler.post(
    catchAsync(async (req, res, next) => {
        await dbConnect();
        if (!req.body.email || !req.body.name || !req.body.password || !req.body.passwordConfirm || !req.body.role) {
            return next(new AppError('Please provide complete details!', 400));
        }
        if (req.body.password !== req.body.passwordConfirm) {
            return next(new AppError('password and passwordConfirm should be same!', 403));
        }
        if (req.body.otporg !== req.body.otpusr) {
            return next(new AppError('Invalid OTP!', 403));
        }
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role,
        });

        authController.createSendToken(newUser, 201, res);
    })
);

export default handler;
