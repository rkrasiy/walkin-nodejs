import { Router } from 'express';
import { check } from 'express-validator';
import { isQuoteIdExist, isServiceIdExist } from '../helpers/db-validators';
import { fieldsValidator } from '../middlewares/fileds-validator';
import { validateJWT } from '../middlewares/validate-jwt';
import { hasPermissions } from '../middlewares/validate-role';
import { getQuotes, newQuote, removeQuote } from '../controllers/quote.controller';

const router = Router();

router.get("/", getQuotes);

router.post("/", [
  check('service', 'Is not valid id').isMongoId(),
  check('service').custom(isServiceIdExist),
  check('fullName', 'Fullname is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('phone', 'Phone is not valid').isMobilePhone('es-ES'),
  check('start').isISO8601().toDate(),
  check('end').isISO8601().toDate(),
  fieldsValidator
], newQuote);

router.delete("/:id", [
  validateJWT,
  hasPermissions,
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isQuoteIdExist),
  fieldsValidator
], removeQuote);

export default router;