import express, { Router } from 'express';
import { createBook, getAllBooks } from '../controllers/bookController';
import { getAllGenres } from '../controllers/genreController';

const router: Router = express.Router();
router.get('/books', getAllBooks);
router.post('/createBook', createBook);
router.get('/genres', getAllGenres);

export default router;