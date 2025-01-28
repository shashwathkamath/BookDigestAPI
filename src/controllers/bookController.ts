import { Request, Response } from 'express';
import Book from "../models/Book";
import User from '../models/User';

export async function getAllBooks(req: Request, res: Response) {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Get a single book by ID
export async function getBookById(req: Request, res: Response) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Create a new book
export async function createBook(req: Request, res: Response) {
    try {
        const { bookData } = req.body;
        console.log('bookData:', bookData);

        if (!bookData || !bookData.sellerId) {
            return res.status(400).json({ message: 'Missing required data' });
        }

        // Modified seller validation
        const seller = await User.findOne({ id: bookData.sellerId.toString() });
        console.log('Searching for seller ID:', bookData.sellerId);
        console.log('Found seller:', seller);

        if (!seller) {
            return res.status(404).json({
                message: 'Invalid Seller ID',
                searchedId: bookData.sellerId
            });
        }
        const newBook = new Book({
            title: bookData.title,
            author: bookData.authors.join(', '),
            description: bookData.description || bookData.synopsis,
            isbn: bookData.isbn10,
            isbn13: bookData.isbn13,
            language: bookData.language,
            publisher: bookData.publisher,
            msrp: bookData.msrp || '0.00',
            imageUrl: bookData.image,
            listingPrice: bookData.listingPrice,
            dimensions: bookData.dimensions,
            binding: bookData.binding,
            datePublished: bookData.date_published,
            sellerId: bookData.sellerId
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);

    } catch (error) {
        console.error('Error creating book:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
    }
}

// Update a book by ID
export async function updateBook(req: Request, res: Response) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// Delete a book by ID
export async function deleteBook(req: Request, res: Response) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}