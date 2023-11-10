const dbConnect = require('../../../../db/mongoose');
import Video from '../../../db/models/videoModel';
import { NextResponse } from 'next/server';

export async function GET(req)
{
    try {
        await authController.protect(req);

        const videos = await Video.find({}).populate('uploader');

        return NextResponse.json(
            {
                status: 'success',
                results: videos.length,
                data: {
                    videos,
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

        const video = Object.assign(req.body, {
            uploader: req.user._id.toString(),
        });

        await Video.create(video);

        return NextResponse.json(
            {
                status: 'success',
                message: 'Video added Successfully',
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
