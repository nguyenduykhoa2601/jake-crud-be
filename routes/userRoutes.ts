import { Router } from 'express';
import multer from 'multer';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/users', upload.single('avatar'), createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', upload.single('avatar'), updateUser);
router.delete('/users/:id', deleteUser);

export default router;
