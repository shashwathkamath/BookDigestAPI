import express, { Router } from 'express';
import { getAllBooks, getBookById, postBook } from '../controllers/bookController';
import { getAllGenres } from '../controllers/GenreController';

const router: Router = express.Router();
router.get('/books', getAllBooks);
router.post('/createBook', postBook);
router.get('/genres', getAllGenres);
router.get('/books/:id', getBookById);

export default router;