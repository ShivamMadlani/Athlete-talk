import nodemailer from "nodemailer";
const nc = require("next-connect");
const authController = require("../../../../authController");
import catchAsync from "../../../../utils/catchAsync";
import AppError from "../../../../utils/appError";



const handler = nc({
    onError: authController.handleError,
    onNoMatch: authController.handleNoMatch,
});


handler.post(
    catchAsync(async (req, res, next) => {
      const email = req.body.email;
  
      if (email === undefined) {
        throw next(new AppError("Provide an email", 400));
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "athletetalk2000@gmail.com",
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: "athletetallk2000@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `Your OTP is ${req.body.otp}`,
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