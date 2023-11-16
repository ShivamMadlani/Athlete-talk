const nc = require('next-connect');
const dbConnect = require('../../../db/mongoose');
import User from '../../../db/models/userModel';
import catchAsync from '../../../utils/catchAsync';
const authController = require('../../../authController');
const AppError = require('../../../utils/appError');
const jwt = require('jsonwebtoken');

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

handler.post(
  catchAsync(async (req, res, next) => {
    await dbConnect();
    const { token } = req.query;

    try {

      const decoded = jwt.verify(token, 'This is a Sceret Key you will never know');

      const useremail = decoded.email;
      const user = await User.findOne({ email: useremail }).select('+password');
      user.password = req.body.password;
      user.passwordConfirm = req.body.password;
      user.save();
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });

    }
    catch (error) {
      console.log(error);
      return next(new AppError('Something went wrong', 400));
    }
  })
);

export default handler;