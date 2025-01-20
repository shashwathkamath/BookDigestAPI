import dotenv from 'dotenv';
import { ServerApiVersion } from 'mongodb';
import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
    dotenv.config();
    try {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            throw new Error('MongoDB connection string is not defined');
        }
        await mongoose.connect(dbURI!, {
            serverApi: {
                version: ServerApiVersion.v1,
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
        process.exit(1);
    }
};

export default connectDB;