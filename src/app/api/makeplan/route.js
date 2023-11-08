const dbConnect = require('../../../../db/mongoose');
import Plan from '../../../db/models/planModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    const newPlan = await Plan.create({
        name: data.name,
        description: data.description,
        noOfDays: data.noOfDays,
        videos: data.videos,
        categories: data.categories,
        createdAt: data.createdAt,
        creator: data.creator,
        duration: data.duration
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
