import { Router } from 'express';
import * as doctorController from '../controllers/doctors.controller.js';

const router = Router();

router.get( '/search', doctorController.searchDoctors);

router.get('/', doctorController.getAllDoctors);

router.get('/:id' , doctorController.getDoctorById);

router.post('/', doctorController.createDoctor);

router.put('/:id', doctorController.updateDoctor);

router.delete( '/:id', doctorController.deleteDoctor);



export default router;