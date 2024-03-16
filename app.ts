import express from "express";
import getSession from "./config/neo4j";

// Creating express object
const app = express();
app.use(express.json());


// Function to execute Neo4j query
async function runNeo4jQuery(query: any) {
    const session = getSession();
    try {
        const result = await session.run(query);
        return result.records;
    } finally {
        await session.close();
    }
}

// Example query to retrieve all Book nodes
const query = `MATCH (n:Book) RETURN n`;

// Executing the query
runNeo4jQuery(query)
    .then(records => {
        const books = records.map(record => record.get('n').properties);
        console.log('Query result:', books);
    })
    .catch(error => {
        console.error('Error executing Neo4j query:', error);
    });

// Port number
const PORT = process.env.PORT || 3000;

// Server setup
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
