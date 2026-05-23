import { Router } from 'express';
import * as appointmentController
from '../controllers/appointments.controller.js';

const router = Router();

router.get('/search', appointmentController.searchAppointments);

router.get('/', appointmentController.getAllAppointments);

router.get( '/:id', appointmentController.getAppointmentById);

router.post('/', appointmentController.createAppointment);

router.post('/change/:id', appointmentController.changeAppointmentState)




export default router;