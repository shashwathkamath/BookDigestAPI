import { Request, Response } from "express";
import { getAllNodes, runNeo4jQuery } from "../utils/queryUtil";

export async function getAllBooks(req: Request, res: Response) {
    try {
        const books = await getAllNodes('Book');
        res.json(books);
    } catch (error) {
        console.error('Error in getAllBooks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createBook(req: Request, res: Response) {
    /**MERGE (:Book {title: 'To Kill a Mockingbird', 
     * author: 'Harper Lee', year: 1960, genre: 'Fiction', pages: 281, 
     * isbn: '9780061120084', published_date: date('1960-07-11'), original_cost: 12.95}) */
    try {

        const { title, author, year, genre, pages, isbn, publishedDate, originalCost } = req.body;
        const query = `
    MERGE (b:Book { title: "${title}", author: "${author}", year: ${year}, genre: "${genre}",
                   pages: ${pages}, isbn: "${isbn}", published_date: "${publishedDate}",
                   original_cost: ${originalCost}})
    RETURN b`;

        const result = await runNeo4jQuery(query);
        console.log("result", result);
        res.json(result);
    } catch (error) {
        console.error('Error creating a book: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}