import getSession from "../config/neo4j";


export async function getAllNodes(nodeType: string): Promise<any[]> {
    try {
        const query = `MATCH (n:${nodeType}) RETURN n`;
        const records = await runNeo4jQuery(query);
        return records.map((record: any) => record.get('n').properties);
    } catch (error) {
        console.error(`Error fetching ${nodeType}:`, error);
        throw error;
    }
}

export async function getNodeById(nodeType: string, id: string): Promise<any> {
    try {
        const query = `MATCH (n:${nodeType} {isbn: $id}) RETURN n`;
        const records = await runNeo4jQuery(query, { id });
        return records.length > 0 ? records[0].get('n').properties : null;
    } catch (error) {
        console.error(`Error fetching ${nodeType} with id ${id}:`, error);
        throw error;
    }
}

export async function runNeo4jQuery(query: string, params: Record<string, any> = {}): Promise<any> {
    const session = getSession();
    try {
        const result = await session.run(query, params);
        return result.records;
    } catch (error) {
        console.error("Error while querying", error);
        throw error;
    } finally {
        await session.close();
    }
}