import { Router } from 'express';
import { check } from 'express-validator';
import { isServiceIdExist } from '../helpers/db-validators';
import { fieldsValidator } from '../middlewares/fileds-validator';
import { validateJWT } from '../middlewares/validate-jwt';
import { getServices, newService, removeService, updateService } from '../controllers/service.controller';

const router = Router();

router.get("/", getServices);

router.put("/:id",[
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isServiceIdExist),
  fieldsValidator
], updateService);

router.post("/", [
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Name is required').not().isEmpty(),
  check('time', 'Name is required').not().isEmpty(),
  fieldsValidator
],newService);

router.delete("/:id", [
  validateJWT,
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom(isServiceIdExist),
  fieldsValidator
], removeService);

export default router;