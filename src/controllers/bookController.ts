import { Session } from "neo4j-driver-core";
import getSession from "../../config/neo4j";

const bookController = {
    getAllBooks: async (req: Request, res: Response) => {
        let session: Session | undefined;
        console.log("session", session);
        try {
            session = getSession();
            // Execute a Cypher query to fetch all books
            const result = await session.run('MATCH (b:Book) RETURN b');
            const books = result.records.map(record => record.get('b'));
            console.log("books", books);
            res.json()
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status
        } finally {
            if (session) session.close(); // Close the session if it exists
        }
    },

    // Other controller methods...
};
export default bookController;