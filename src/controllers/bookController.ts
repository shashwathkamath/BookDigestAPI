import { Request, Response } from 'express';
import Book from "../models/Book";

export async function getAllBooks(req: Request, res: Response) {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

