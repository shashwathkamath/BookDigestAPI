import { driver } from "../../config/neo4j";

async function testConnection() {
    const session = driver.session()
    try {
        const result = await session.run('RETURN 1');
        console.log('Connection Successful', result.records);
    } catch (error) {
        console.log('Connection Failed', error);
    }
    finally {
        await session.close();
    }
}