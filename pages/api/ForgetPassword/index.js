const jwt = require("jsonwebtoken");
const nc = require("next-connect");
import catchAsync from "../../../utils/catchAsync";
const authController = require("../../../authController");
import nodemailer from "nodemailer";

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

handler.post(
  catchAsync(async (req, res, next) => {
    const email = req.body.email;

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
        user: "202101042@daiict.ac.in",
        pass: "qesu fyaz opil sfmf",
      },
    });

    const mailOptions = {
      from: "202101042@daiict.ac.in",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:3000/ResetPassword/${token}`,
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
