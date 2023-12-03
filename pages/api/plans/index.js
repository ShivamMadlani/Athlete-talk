import Plan from "../../../db/models/planModel";
import AppError from "../../../utils/appError";
const nc = require("next-connect");
const catchAsync = require("../../../utils/catchAsync");
const authController = require("./../../../authController");

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

handler.get(
  authController.protect,
  catchAsync(async (req, res, next) => {
    const plans = await Plan.find({}).populate("creator");

    res.status(200).json({
      status: "success",
      results: plans.length,
      data: {
        plans,
        preferredCategories: req.user.preferredCategories,
      },
    });
  })
);

handler.post(
  authController.protect,
  authController.restrictTo("admin", "coach"),
  catchAsync(async (req, res, next) => {
    const plan = Object.assign(req.body, {
      creator: req.user._id.toString(),
    });

    if (!plan.name || !plan.description || !plan.noOfDays) {
      throw new AppError("Enter plan details", 400);
    }

    if (typeof plan.noOfDays === "number") {
      throw new AppError("Should be an integer", 400);
    }

    if (plan.videos.length == 0) {
      throw new AppError("No videos added", 400);
    }

    await Plan.create(plan);

    res.status(200).json({
      status: "success",
      message: "Plan Added Successfully",
    });
  })
);

export default handler;
