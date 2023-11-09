const dbConnect = require('../../../../db/mongoose');
import Video from '../../../db/models/videoModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    const newVideo = await Videp.create({
        title: data.title,
        description: data.description,
        gDriveID: data.gDriveID,
        createdAt: data.createdAt,
        categories: data.categories,
        uploader: data.uploader,
    });
    return NextResponse.json(
        {
            message : "New Plan made"
        },
        {
            status : 200
        }
    );
}
