import { Router } from 'express';
import * as prescriptionController
from '../controllers/prescriptions.controller.js';

const router = Router();

router.post('search', prescriptionController.getPrescriptionsByPatient)

router.get('/', prescriptionController.getAllPrescriptions);

router.get('/:id', prescriptionController.getPrescriptionById);

router.post('/', prescriptionController.createPrescription);



export default router;