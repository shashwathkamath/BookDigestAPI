import { Request, Response } from "express";
import { getAllNodes } from "../utils/queryUtil";
/**
 * Retrieves all genres from the Neo4j database and sends them as a JSON response.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function getAllGenres(req: Request, res: Response) {
    try {
        const genres = await getAllNodes('Genre');
        res.json(genres);
    } catch (error) {
        console.error('Error in getAllGenres:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
