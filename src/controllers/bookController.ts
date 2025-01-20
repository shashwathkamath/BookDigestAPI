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
        const { title, author, description, isbn, isbn13, language, publisher, pages, msrp, imageUrl, sellerId } = req.body;
        const seller = await User.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Invalid Seller ID' });
        }

        const newBook = new Book({
            title,
            author,
            description,
            isbn,
            isbn13,
            language,
            publisher,
            pages,
            msrp,
            imageUrl,
            seller: sellerId,
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error });
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