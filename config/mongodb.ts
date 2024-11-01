import dotenv from 'dotenv';
import { ServerApiVersion } from 'mongodb';
import mongoose, { ConnectOptions } from 'mongoose';
import { startNgrok } from './ngrok';

const connectDB = async () => {
    dotenv.config();
    try {
        const dbURI = process.env.MONGO_URI;
        await mongoose.connect(dbURI!, {
            serverApi: {
                version: ServerApiVersion.v1, // Correct usage of the version enum
                strict: true,
                deprecationErrors: true,
            },
        } as ConnectOptions); // Type assertion to ConnectOptions

        console.log('MongoDB connected successfully');
        await startNgrok();
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;