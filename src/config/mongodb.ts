import dotenv from 'dotenv';
import { ServerApiVersion } from 'mongodb';
import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
    dotenv.config();
    try {
        const dbURI = process.env.MONGO_URI;
        console.log('Connecting to MongoDB...', dbURI);
        await mongoose.connect(dbURI!, {
            serverApi: {
                version: ServerApiVersion.v1, // Correct usage of the version enum
                strict: true,
                deprecationErrors: true,
            },
            dbName: 'bookDB',
            retryWrites: true,
            w: 'majority',
        } as ConnectOptions); // Type assertion to ConnectOptions

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;