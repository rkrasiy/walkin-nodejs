import { Router } from 'express';
import { check } from 'express-validator';
import { isValidRole, isUniqEmail, isUniqPhone, isManagerIdExist } from '../helpers/db-validators';
import { fieldsValidator } from '../middlewares/fileds-validator';
import { validateJWT } from '../middlewares/validate-jwt';
import { hasPermissions } from '../middlewares/validate-role';
import { getManagers, newManager, removeManager, updateManagers } from '../controllers/manager.controller';

const router = Router();

router.get("/", getManagers);

router.put("/:id",[
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isManagerIdExist),
  check('role').custom( isValidRole ),
  fieldsValidator
], updateManagers);

router.post("/", [
  check('name', 'Name is required').not().isEmpty(),
  check('surname', 'Surname is required').not().isEmpty(),
  check('password', 'Password should contain more than 6 characters').isLength({min: 6}),
  check('email', 'Email is not valid').isEmail(),
  check('phone', 'Phone is not valid').isMobilePhone('es-ES'),
  check('phone').custom(isUniqPhone),
  check('email').custom(isUniqEmail),
  check('role').custom( isValidRole ),
  fieldsValidator
],newManager);


router.delete("/:id", [
  validateJWT,
  // isAdminRole,
  hasPermissions,
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isManagerIdExist),
  fieldsValidator
], removeManager);

export default router;