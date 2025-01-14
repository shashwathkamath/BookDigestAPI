import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    profilePicUrl?: string;
    givenName?: string;
    familyName?: string;
    contactNumber?: string;
    address?: string;
    paymentMode?: string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        profilePicUrl: { type: String },
        givenName: { type: String },
        familyName: { type: String },
        contactNumber: { type: String },
        address: { type: String },
        paymentMode: { type: String }
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

export default mongoose.model<IUser>('User', userSchema);
