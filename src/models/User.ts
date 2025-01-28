import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    email: string;
    name: string;
    picture?: string;
    role: 'user' | 'admin';
    createdBooks: string[];
    savedBooks: string[];
    contactInfo?: {
        phone?: string;
        address?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdBooks: [{
        type: String,
        ref: 'Book'
    }],
    savedBooks: [{
        type: String,
        ref: 'Book'
    }],
    contactInfo: {
        phone: String,
        address: String
    }
}, {
    timestamps: true,
    _id: false
});

export default mongoose.model<IUser>('User', userSchema);