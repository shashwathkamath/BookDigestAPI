import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    description?: string;
    isbn: string;
    isbn13?: string;
    language: string;
    publisher?: string;
    pages?: number;
    msrp: number;
    imageUrl?: string;
    sellerId: string;  // Single field for seller, using Google OAuth ID
    buyer?: string;
    listingPrice: number;
    binding?: string;
    datePublished?: string;
    dimensions?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    description: { type: String },
    isbn: { type: String, required: true },
    isbn13: { type: String },
    language: { type: String, required: true },
    publisher: { type: String },
    pages: { type: Number },
    msrp: { type: Number, required: true },
    imageUrl: { type: String },
    sellerId: {
        type: String,
        required: true,
        ref: 'User'  // Reference to User model
    },
    buyer: {
        type: String,
        ref: 'User'
    },
    listingPrice: { type: Number, required: true },
    binding: { type: String },
    datePublished: { type: String },
    dimensions: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IBook>('Book', BookSchema);