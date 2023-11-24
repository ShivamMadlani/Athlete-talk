const jwt = require("jsonwebtoken");
const nc = require("next-connect");
const dbConnect = require("../../../db/mongoose");
const User = require("../../../db/models/userModel");
const AppError = require("../../../utils/appError");
import catchAsync from "../../../utils/catchAsync";
const authController = require("../../../authController");
import nodemailer from "nodemailer";

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

handler.post(
  catchAsync(async (req, res, next) => {
    await dbConnect();
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("error here");
      return next(
        new AppError(
          "Not a registered user please create a account first!",
          400
        )
      );
    }

    const token = jwt.sign(
      { email },
      "This is a Sceret Key you will never know",
      { expiresIn: "1h" }
    );

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "athletetalk2000@gmail.com",
        pass: "nfjs dkiw rajo rvru",
      },
    });

    const mailOptions = {
      from: "athletetallk2000@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:3000/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          status: "success",
        });
      }
    });
  })
);

export default handler;