import { Router } from 'express';
import { check } from 'express-validator';
import { fieldsValidator } from '../middlewares/fileds-validator';
import { sendEmail } from '../controllers/validate.controller';

const router = Router();

router.post("/", [
  check('email', 'Email is not valid').isEmail(),
  fieldsValidator
], sendEmail);

export default router;