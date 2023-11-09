import User from '../../../db/models/userModel';
import UserPlan from '../../../db/models/userPlanModel';
import { NextResponse } from 'next/server';
import AppError from '@/utils/appError';

const authController = require('../../../authController');

export async function GET(req) {
    try {
        await authController.protect(req);
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

        console.log(userPlans)
        console.log(userCategories)

        return NextResponse.json(
            {
                data: {
                    userPlans,
                    userCategories,
                }
            }, {
            status: 200
        });
    } catch (error) {
        console.log(error);
        const flag = error instanceof AppError
        return NextResponse.json(
            {
                error: flag ? error.message : 'Internal Server Error'
            },
            {
                status: flag ? error.statusCode : 500
            },
        );
    }
}