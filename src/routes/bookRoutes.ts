import { router } from '../config/router';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/bookController';

router.get('/books', getAllBooks);
router.get('/:id', getBookById); // Get a book by ID
router.post('/create', createBook); // Create a new book
router.put('/:id', updateBook); // Update a book by ID
router.delete('/:id', deleteBook); // Delete a book by ID
console.log('Book routes registered');

export default router;