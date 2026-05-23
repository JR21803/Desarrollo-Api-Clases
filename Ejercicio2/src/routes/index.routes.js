import { Router } from 'express';

import doctorsRoutes
from './doctors.routes.js';

import patientsRoutes
from './patients.routes.js';

import appointmentsRoutes
from './appointments.routes.js';

import prescriptionsRoutes
from './prescriptions.routes.js';

const router = Router();

router.use('/doctors', doctorsRoutes);

router.use('/patients', patientsRoutes);

router.use('/appointments', appointmentsRoutes);

router.use('/prescriptions', prescriptionsRoutes);

export default router;