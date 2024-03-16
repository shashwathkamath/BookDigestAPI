import { runNeo4jQuery } from "../utils/queryUtil";
import { Request, Response } from "express";

export async function getAllBooks(req: Request, res: Response) {
    try {
        const query = `MATCH (n:Book) RETURN n`;
        const records = await runNeo4jQuery(query);
        const books = records.map((record: any) => record.get('n').properties);
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}