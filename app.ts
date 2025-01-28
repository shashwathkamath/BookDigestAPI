import express, { Application } from "express";
import connectDB from "./src/config/mongodb";
import bookRoutes from "./src/routes/bookRoutes";
import userRoutes from "./src/routes/userRoutes";

// Creating express object
const app: Application = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
// Register routes with prefixes
app.use(bookRoutes);
app.use(userRoutes);

// Server setup
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
server.on('error', (error) => {
    console.error(`Error starting server: ${error.message}`);
});