const dbConnect = require('../../../../db/mongoose');
const User = require('../../../../db/models/userModel');
const authController = require('../../../../authController');
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        role: data.role,
    });
    const obj = authController.createSendToken(newUser);
    return NextResponse.json(obj);
}
