import mongoose, { Document, Schema } from 'mongoose';
// Define an interface for the Book document
interface IBook extends Document {
    title: string;
    author: string;
    description?: string; // Optional field
    isbn: string;
    isbn13?: string; // Optional field
    language: string;
    publisher?: string; // Optional field
    pages: number;
    msrp: number;
    imageUrl?: string; // Optional field for storing book image
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
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});


const Book = mongoose.model<IBook>('Book', BookSchema);
export default Book;