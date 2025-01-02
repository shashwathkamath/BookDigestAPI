import express, { Application } from "express";
import connectDB from "./src/config/mongodb";
import bookRoutes from "./src/routes/bookRoutes";
import userRoutes from "./src/routes/userRoutes";

// Creating express object
const app: Application = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
// Register routes
app.use(bookRoutes);
app.use(userRoutes);

export default app;
