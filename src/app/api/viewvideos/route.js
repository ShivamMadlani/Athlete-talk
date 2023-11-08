import Video from '../../../db/models/videoModel'
import User from '../../../db/models/userModel';
import { NextResponse } from 'next/server';
import AppError from '@/utils/appError';

const authController = require('../../../authController');

export async function GET(req) {
    try {
        await authController.protect(req);
        //fetch plans for given user

        const userCategories = await User.find({ _id: req.user._id })
            .select('preferredCategories')
            .populate('preferredCategories');

        const Videos = await Video.find({ categories: { $in: userCategories } }).populate('categories');

        console.log(Videos);

        return NextResponse.json(
            {
                data: {
                    Videos,
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