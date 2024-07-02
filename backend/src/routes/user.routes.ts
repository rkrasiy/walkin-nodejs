import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers, updateUsers, newUser, removeUser, getUser } from '../controllers/user.controller';
import { isUniqEmail, isUserIdExist, isUniqPhone } from '../helpers/db-validators';
import { fieldsValidator } from '../middlewares/fileds-validator';
import { validateJWT } from '../middlewares/validate-jwt';
import { hasPermissions } from '../middlewares/validate-role';

const router = Router();

router.get("/", getUsers);

router.get("/:id",[
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isUserIdExist),
  fieldsValidator
], getUser);

router.put("/:id",[
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isUserIdExist),
  fieldsValidator
], updateUsers);

router.post("/", [
  check('fullName', 'Fullname is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(isUniqEmail),
  check('phone', 'Phone is not valid').isMobilePhone('es-ES'),
  check('phone').custom(isUniqPhone),
  fieldsValidator
],newUser);

router.delete("/:id", [
  validateJWT,
  hasPermissions,
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isUserIdExist),
  fieldsValidator
], removeUser);

export default router;