import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.book.create), controller.createBook);
router.get('/get/:bookId', controller.readBook);
router.get('/get/', controller.readAll);
router.patch('/update/:bookId', ValidateJoi(Schemas.book.update), controller.UpdateBook);
router.delete('/delete/:bookId', controller.deleteBook);

export default router;
