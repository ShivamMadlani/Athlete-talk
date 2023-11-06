import User from '../../../db/models/userModel';
import UserPlan from '../../../db/models/userPlanModel';
import { NextResponse } from 'next/server';

const authController = require('../../../authController');

export async function GET() {
    //fetch plans for given user
    const userPlansP = UserPlan.find({ user: req.user._id })
        .populate('plan')
        .populate('user');

    const userCategoriesP = User.find({ _id: req.user._id })
        .select('preferredCategories')
        .populate('preferredCategories');

    const [userPlans, userCategories] = await Promise.all([
        userPlansP,
        userCategoriesP,
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            userPlans,
            userCategories,
        },
    });
}