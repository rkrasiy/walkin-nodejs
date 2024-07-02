import { Router } from 'express';
import { check } from 'express-validator';
import { isServiceIdExist, isUserIdExist } from '../helpers/db-validators';
import { fieldsValidator } from '../middlewares/fileds-validator';
import { confirmAppointment, getAppointments, newAppointment, userChecking } from '../controllers/appointments.controller';
import { validateJWT } from '../middlewares/validate-jwt';

const router = Router();

router.get("/confirm-appointment", confirmAppointment);

router.get("/", [
  validateJWT
], getAppointments);

//Route for checking a user. If doesn't exist it will create, else it will return token.
router.post("/user-validation", [
  check('service', 'Is not valid id').isMongoId(),
  check('service').custom(isServiceIdExist),
  check('fullName', 'Fullname is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('phone', 'Phone is not valid').not().isEmpty(),
  check('receiveNotification', 'Receive notification is required').not().isEmpty(),
  fieldsValidator
], userChecking)

//Route for create an appointment
router.post("/", [
  check('service', 'Is not valid id').isMongoId(),
  check('service').custom(isServiceIdExist),
  check('user', 'Is not valid id').isMongoId(),
  check('user').custom(isUserIdExist),
  check('fullName', 'Fullname is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('phone', 'Phone is not valid').isMobilePhone('es-ES'),
  check('start').isISO8601().toDate(),
  check('end').isISO8601().toDate(),
  fieldsValidator
], newAppointment);

export default router;