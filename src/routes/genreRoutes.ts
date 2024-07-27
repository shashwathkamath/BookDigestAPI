import { Request, Response } from "express";
import { runNeo4jQuery } from "../utils/queryUtil";
export async function getAllGenres(req: Request, res: Response) {
    try {
        const query = `MATCH (g:Genre) return g`;
        const records = await runNeo4jQuery(query);
        const genres = records.map((record: any) => record.get('g').properties);
        res.json(genres);
    }
    catch (error) {
        console.log('Error fetching genres:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}