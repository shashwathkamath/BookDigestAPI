import dotenv from 'dotenv';
import { ServerApiVersion } from 'mongodb';
import mongoose, { ConnectOptions } from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

const connectDB = async () => {
    dotenv.config();

    if (cachedConnection) {
        console.log('Using cached database connection');
        return cachedConnection;
    }

    try {
        const dbURI = process.env.MONGO_URI;

        if (!dbURI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        const connection = await mongoose.connect(dbURI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            // Add these options for better Lambda performance
            maxPoolSize: 1,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        } as ConnectOptions);

        cachedConnection = connection;
        console.log('MongoDB connected successfully');

        return connection;
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        // Don't exit process in Lambda
        throw error;
    }
};

// Add connection cleanup
const closeConnection = async () => {
    if (cachedConnection) {
        await mongoose.disconnect();
        cachedConnection = null;
        console.log('MongoDB connection closed');
    }
};

export { closeConnection, connectDB };

