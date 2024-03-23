import express, { Router } from 'express';
import { createBook, getAllBooks } from '../controllers/bookController';

const router: Router = express.Router();
router.get('/books', getAllBooks);
router.post('/createBook', createBook);

export default router;