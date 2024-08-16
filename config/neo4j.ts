import dotenv from 'dotenv';
import neo4j, { AuthToken, Driver, Session } from 'neo4j-driver';

dotenv.config();

const neo4jUri: string = process.env.NEO4J_URI || '';
const neo4jUser: string = process.env.NEO4J_USERNAME || '';
const neo4jPassword: string = process.env.NEO4J_PASSWORD || '';

const auth: AuthToken = neo4j.auth.basic(neo4jUser, neo4jPassword);

// Neo4j driver setup
export const driver: Driver = neo4j.driver(neo4jUri, auth, {
    maxConnectionPoolSize: 50,
    connectionAcquisitionTimeout: 30000
});

// Function to get a session
const getSession = (): Session => driver.session();

// Close Neo4j driver on application exit
process.on('exit', () => {
    driver.close();
});

export default getSession;