const dbConnect = require('../../../../db/mongoose');
const User = require('../../../../db/models/userModel');
const authController = require('../../../../authController');
const AppError = require('../../../../utils/appError');
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    const email = data.email;
    const password = data.password;

    if (!email || !password) {
        return NextResponse.json((new AppError('Please provide email and password!', 400)));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return NextResponse.json((new AppError('Incorrect email or password!', 401)));
    }

    const obj = authController.createSendToken(user);
    return NextResponse.json(obj);
}
