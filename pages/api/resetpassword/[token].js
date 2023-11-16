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

        const { Password } = req.body;
        const { token } = req.query;

        try{
    
            const decoded = jwt.verify(token,'This is a Sceret Key you will never know');

            const useremail = decoded.email;

            const filter = { email: useremail };
            const update = { password: Password };

  
            const doc = await User.findOneAndUpdate(filter, update, {
              returnOriginal: false
            });
           

            res.status(200).json({
                status: 'success',
                data: {
                  doc,
                },
              });

        }
        catch (error)
        {
            return next(new AppError('Something went wrong', 400));
        }
    })
);

export default handler;