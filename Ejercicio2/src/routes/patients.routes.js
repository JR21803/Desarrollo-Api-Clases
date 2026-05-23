import { Router } from 'express';
import * as patientController from '../controllers/patients.controller.js';

const router = Router();

router.get('/search', patientController.searchPatients);

router.get('/', patientController.getAllPatients);

router.get('/:id', patientController.getPatientById);

router.post('/', patientController.createPatient);

router.put('/:id', patientController.updatePatient);

router.delete('/:id', patientController.deletePatient);





export default router;