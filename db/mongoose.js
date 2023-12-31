import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Define the MONGODB_URI environment variable inside .env.local'
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('Connected to MongoDB');
            require('./models/userModel');
            require('./models/categoryModel');
            require('./models/videoModel');
            require('./models/planModel');
            // require('./../models/messageModel');
            // require('./../models/chatModel');
            require('./models/userPlanModel');
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = dbConnect;
