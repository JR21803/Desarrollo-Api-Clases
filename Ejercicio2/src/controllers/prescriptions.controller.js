import * as prescriptionService from '../services/prescriptions.service.js'

export const getAllPrescriptions = (req, res) => {
  try{
  const prescriptions = prescriptionService.getPrescriptions();

  res.json(prescriptions);
  }
  catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getPrescriptionById = (req, res) => {

  try{
    const {id} = req.params

    const prescriptions = prescriptionService.getPrescriptionById(id);

    res.status(200).json(prescriptions);

  }

  catch (error) {
          res.status(400).json({
              message: error.message
          });
      }

};

export const createPrescription = (req, res) => {
    try {
        const prescription =
            prescriptionService.createPrescription(req.body);

        res.status(201).json(prescription);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getPrescriptionsByPatient = (req, res) => {
    try {
        const {id} = req.params

        const prescriptions = prescriptionService.getPrescriptionsByPatient(id)

        res.status(200).json(prescriptions)
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}