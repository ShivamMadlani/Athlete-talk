const dbConnect = require('../../../../db/mongoose');
const User = require('../../../../db/models/userModel');
const authController = require('../../../../authController');
import { NextResponse } from 'next/server';

await dbConnect();

export async function POST(req, res) {
    const data = await req.json();
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        role: data.role,
    });
    authController.createSendToken(newUser, 201, res);
    return NextResponse.json(data);
}
