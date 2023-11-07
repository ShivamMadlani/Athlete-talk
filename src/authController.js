const { promisify } = require('util');
const dbConnect = require('./../src/db/mongoose');
const AppError = require('./utils/appError');
const User = require('./db/models/userModel');
const catchAsync = require('./utils/catchAsync');
const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');
const { NextResponse } = require('next/server');

exports.handleError = (err, req, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(err);

    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

exports.handleNoMatch = (req, res) => {
    res.status(404).json({ err: 'Page is not found' });
};

exports.signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.createSendToken = (user) => {
    const token = this.signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
    };
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    serialize('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    return ({
        status: 'success',
        token,
        data: {
            user,
        }
    })
};

exports.protect = async (req) => {
    try {
        await dbConnect();
        // console.log(req.headers);
        // 1) Getting the token and check if it exists
        const authorization = req.headers.get('authorization')
        let token;
        if (
            authorization &&
            authorization.startsWith('Bearer')
        ) {
            token = authorization.split(' ')[1];
        }
        // console.log(token);

        if (!token) {
            throw new AppError('You are not logged in! Please log in to get access.', 401)
        }

        // const token = req.headers.authorization.split(' ')[1];

        //2) Token verification
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        //3) Check if user still exists
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
            throw new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        }

        // console.log(freshUser);

        //4) Check if user changed password after the token was issued
        if (freshUser.changedPasswordAfter(decoded.iat)) {
            throw new AppError('User recently changed password! Please log in again.', 401)
        }

        req.user = freshUser;
    } catch (error) {
        throw error
    }
};

exports.restrictTo = (...roles) => {
    return async (req, res, next) => {
        //roles = ['admin', 'coach']
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }
        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    //1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    //2) Generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    //3) Send it to user's email
    const resetURL = `http://localhost:3000/api/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n Didn't forget your password, please ignore this email.`;

    return next(
        new AppError('There was an error sending the email. Try again later.', 500)
    );

    // res.status(200).json({ status: 'success', message: 'Token sent to email!' });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    //1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    //2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong.', 401));
    }

    //3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    //4) Log user in, send JWT
    this.createSendToken(user, 200, res);
});
