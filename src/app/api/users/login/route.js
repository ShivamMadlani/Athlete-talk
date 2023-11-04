const dbConnect = require('../../../../db/mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../../../db/models/userModel');

const authController = require('../../../../authController');
import { NextResponse } from 'next/server';

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    console.log(data);
    const {email,password} = data;
    const user = await User.findOne({email});

    if(!user)
    {
        console.log("invalid password or email");
    }

    const passwordMatch = await user.correctPassword(password);


    if (!passwordMatch) {
        console.log("invalid password or email");
    }

    const obj = authController.createSendToken(user);
    return NextResponse.json(obj);
}