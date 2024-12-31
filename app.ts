import express, { Application } from "express";
import bookRoutes from "./src/routes/bookRoutes";

const app: Application = express();

// Middleware
app.use(express.json());

// Mount book routes with prefix
app.use('/api/books', bookRoutes);

export { app };
