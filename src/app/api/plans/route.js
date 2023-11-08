const dbConnect = require('../../../../db/mongoose');
import Plan from '../../../db/models/planModel';
import { NextResponse } from 'next/server';
const authController = require('../../../authController');

export async function GET(req) {
    try {
        await authController.protect(req);

        const plans = await Plan.find({}).populate('creator');

        return NextResponse.json(
            {
                status: 'success',
                results: plans.length,
                data: {
                    plans,
                    preferredCategories: req.user.preferredCategories,
                },
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

export async function POST(req) {
    try {
        await authController.protect(req);

        const plan = Object.assign(req.body, {
            creator: req.user._id.toString(),
        });

        await Plan.create(plan);

        return NextResponse.json(
            {
                status: 'success',
                message: 'Plan Added Successfully',
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
