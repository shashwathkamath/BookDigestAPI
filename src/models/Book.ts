import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    authors: string[];
    description?: string;
    isbn: string;
    isbn10?: string;
    isbn13?: string;
    language: string;
    publisher?: string;
    pages?: number;
    msrp: string;
    imageUrl?: string;
    sellerId: string;
    listingPrice: number;
    binding?: string;
    datePublished?: string;
    dimensions?: {
        height: { value: number; unit: string; };
        length: { value: number; unit: string; };
        weight: { value: number; unit: string; };
        width: { value: number; unit: string; };
    };
    subjects?: string[];
    synopsis?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    description: String,
    isbn: { type: String, required: true },
    isbn10: String,
    isbn13: String,
    language: { type: String, required: true },
    publisher: String,
    pages: Number,
    msrp: { type: String, default: "0.00" },
    imageUrl: String,
    sellerId: { type: String, required: true },
    listingPrice: { type: Number, required: true },
    binding: String,
    datePublished: String,
    dimensions: {
        height: {
            value: Number,
            unit: String
        },
        length: {
            value: Number,
            unit: String
        },
        weight: {
            value: Number,
            unit: String
        },
        width: {
            value: Number,
            unit: String
        }
    },
    subjects: [String],
    synopsis: String
}, {
    timestamps: true
});

export default mongoose.model<IBook>('Book', BookSchema);