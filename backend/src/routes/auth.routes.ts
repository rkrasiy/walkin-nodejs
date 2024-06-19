
import { Router } from 'express';
import { check } from 'express-validator';
import { fieldsValidator } from '../middlewares/fileds-validator';
import loginController from '../controllers/auth.contoller';


const router = Router();

router.post("/sign-in",[
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  fieldsValidator
], loginController);

export default router;