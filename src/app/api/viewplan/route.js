import Plan from '../../../db/models/planModel'
import { NextResponse } from 'next/server';
import AppError from '@/utils/appError';

const authController = require('../../../authController');

export async function GET(req) {
    try {
        await authController.protect(req);
        //fetch plans for given user
        const Plans = await Plan.find({}).toArray();

        console.log(Plans);

        return NextResponse.json(
            {
                data: {
                    Plans,
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