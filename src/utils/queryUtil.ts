import { Neo4jError } from "neo4j-driver-core";
import getSession from "../../config/neo4j";

export async function runNeo4jQuery(query: String): Promise<any> {
    const session = getSession();
    try {
        const result = await session.run(query);
        return result.records;
    }
    catch (e) {
        console.log("Error while querying", e, Neo4jError);
        return e;
    }
    finally {
        await session.close();
    }
}