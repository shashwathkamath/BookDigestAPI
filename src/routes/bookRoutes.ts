import express, { Router } from 'express';
import { createBook, getAllBooks, getBookById } from '../controllers/bookController';
import { getAllGenres } from '../controllers/GenreController';

const router: Router = express.Router();
router.get('/books', getAllBooks);
router.post('/createBook', createBook);
router.get('/genres', getAllGenres);
router.get('/books/:id', getBookById);

export default router;