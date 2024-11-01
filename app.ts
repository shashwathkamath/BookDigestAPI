import express, { Application } from "express";
import connectDB from "./config/mongodb";
import bookRoutes from './src/routes/bookRoutes';

// Creating express object
const app: Application = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/', bookRoutes);

// Server setup
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
