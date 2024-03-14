// Requiring modules
const express = require('express');
const neo4j = require('neo4j-driver');
require('dotenv').config();

// Creating express object
const app = express();
app.use(express.json());

// Creating Neo4j driver
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
    { disableLosslessIntegers: true }
);

// Function to execute Neo4j query
async function runNeo4jQuery(query) {
    const session = driver.session();
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
        console.log('Query result:', records);
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
