import express, { Router } from 'express';
import { getAllBooks } from '../controllers/bookController';

const router: Router = express.Router();
router.get('/books', getAllBooks);

export default router;