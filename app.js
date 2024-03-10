// Requiring module
const express = require('express');
const neo4j = require('neo4j-driver');
require('dotenv').config();
 
// Creating express object
const app = express();
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
    { disableLosslessIntegers: true }
);
 
// Handling GET request
app.get('/', async (req,res) =>{
    try{
        await driver.verifyConnectivity();
        res.send('Neo4j connected successfully');
    }
    catch(e){
        console.error("Error connecting neo4j",e)
        res.status(500).send('Error connecting to Neo4j');
    }
})
 
// Port Number
const PORT = process.env.PORT ||3000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));