import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    _id: string;
    id: string;
    name: string;
    email: string;
    profilePicUrl?: string;
    givenName?: string;
    familyName?: string;
    address?: string;
    contactNumber?: string;
    paymentMode?: string;
    listedBooks?: mongoose.Types.ObjectId[];
    purchasedBooks?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    _id: { type: String },
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicUrl: String,
    givenName: String,
    familyName: String,
    address: { type: String, default: '' },
    contactNumber: { type: String, default: '' },
    paymentMode: { type: String, default: '' },
    listedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        default: []
    }],
    purchasedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        default: []
    }]
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);