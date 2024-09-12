import express from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.author.create), controller.createAuthor);
router.get('/get/:authorsId', controller.readAuthor);
router.get('/get/', controller.readAll);
router.patch('/update/:authorId', ValidateJoi(Schemas.author.update), controller.UpdateAuthor);
router.delete('/delete/:authorId', controller.deleteAuthor);

export default router;
