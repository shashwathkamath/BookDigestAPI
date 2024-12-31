import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import serverless from 'serverless-http';
import { app } from './app';

// Define the type for serverless-http handler response
interface ServerlessResponse {
    statusCode: number;
    body: string | object;
    headers?: {
        [header: string]: string | number | boolean;
    };
}

const serverlessHandler = serverless(app);

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    try {
        // Type assertion for serverless response
        const result = await serverlessHandler(event, context) as ServerlessResponse;

        return {
            statusCode: result.statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: typeof result.body === 'string' ? result.body : JSON.stringify(result.body)
        };
    } catch (error) {
        console.error('Lambda handler error:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
};
