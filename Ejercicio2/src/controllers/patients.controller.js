import * as patientService from "../services/patients.service.js";

export const getAllPatients = (req, res) => {
  try{
  const patients = patientService.getAllPatients();

  res.status(200).json(patients);
  }

  catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getPatientById = (req, res) => {

  try{
  const {id} = req.params

  const patients = patientService.getPatientById(id);

  res.status(200).json(patients);
  }

  catch (error) {
          res.status(400).json({
              message: error.message
          });
      }
};

export const updatePatient = (req,res) => {
  try{
    const {id} = req.params
    const patientData = req.body 

    const updatedPatient = patientService.updatePatient(id, patientData)

    res.status(200).json(updatedPatient)
  }

  catch (error) {
          res.status(400).json({
              message: error.message
          });
      }

}

export const createPatient = (req, res) => {
  try{
  const patientData = req.body

  const newPatient = patientService.createPatient(patientData)

  res.status(201).json(newPatient)
  }
  catch (error) {
          res.status(400).json({
              message: error.message
          });
      }
}

export const deletePatient = (req,res) => {
  try{
    const {id} = req.params
    const patientData = req.body 

    const deletedPatient = patientService.deletePatient(id)

    res.status(204).deletedPatient()
  }

  catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const searchPatients = (req,res) => {

    const { name, dui } = req.query;

    const result =
        patientService
            .searchPatients(
                name, dui
            );

    res.status(200).json(result);

};



