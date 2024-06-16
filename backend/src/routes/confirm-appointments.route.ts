import { Router } from 'express';
import { confirmAppointment } from '../controllers/confirm-appointments.controller';

const router = Router();

router.get("/", confirmAppointment);

export default router;