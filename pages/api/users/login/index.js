const nc = require('next-connect');
const dbConnect = require('./../../../../db/mongoose');
const User = require('./../../../../db/models/userModel');
const authController = require('./../../../../authController');
const AppError = require('./../../../../utils/appError');
const catchAsync = require('./../../../../utils/catchAsync');

const handler = nc({
    onError: authController.handleError,
    onNoMatch: authController.handleNoMatch,
});

handler.post(
    catchAsync(async (req, res, next) => {
        await dbConnect();

        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide email and password!', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password!', 401));
        }

        authController.createSendToken(user, 200, res);
    })
);

export default handler;
