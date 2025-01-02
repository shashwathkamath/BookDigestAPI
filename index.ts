import { Handler } from 'aws-lambda';
import serverless from 'serverless-http';
import app from './app';

export const handler: Handler = serverless(app);