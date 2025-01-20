import mongoose, { Document, Schema } from 'mongoose';
// Define an interface for the Book document
interface IBook extends Document {
    title: string;
    author: string;
    description?: string;
    isbn: string;
    isbn13?: string;
    language: string;
    publisher?: string;
    pages: number;
    msrp: number;
    imageUrl?: string;
    seller: mongoose.Types.ObjectId;
    buyer?: mongoose.Types.ObjectId;
}

// Create a Schema corresponding to the document interface.
const BookSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    isbn13: {
        type: String,
    },
    language: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
    },
    pages: {
        type: Number,
        required: true,
    },
    msrp: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


const Book = mongoose.model<IBook>('Book', BookSchema);
export default Book;