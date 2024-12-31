// src/routes/bookRoutes.ts
import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/bookController';

const router = express.Router();

// Remove '/books' prefix since we're using it in app.use()
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);         // Changed from '/create'
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
