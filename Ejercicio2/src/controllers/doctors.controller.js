import * as doctorService from "../services/doctors.service.js";

export const getAllDoctors = (req, res) => {
  try{
  const doctors = doctorService.getAllDoctors();

  res.json(doctors);
  }
  catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getDoctorById = (req, res) => {

  try{
    const {id} = req.params

    const doctors = doctorService.getDoctorById(id);

    res.status(200).json(doctors);

  }

  catch (error) {
          res.status(400).json({
              message: error.message
          });
      }

};

export const updateDoctor = (req,res) => {
  try{
    const {id} = req.params
    const doctorData = req.body 

    const updatedDoctor = doctorService.updateDoctor(id, doctorData)

    res.status(200).json(updatedDoctor)
  }

    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}

export const createDoctor = (req, res) => {
  try{
  const doctorData = req.body

  const newDoctor = doctorService.createDoctor(doctorData)

  res.status(201).json(newDoctor)
  }

  catch (error) {
          res.status(400).json({
              message: error.message
          });
      }
}

export const deleteDoctor = (req,res) => {
  try{
    const {id} = req.params
    const doctorData = req.body 

    const deletedDoctor = doctorService.deleteDoctor(id)

    res.status(204).json(deletedDoctor)
  }

    catch (error) {
          res.status(400).json({
              message: error.message
          });
      }
}

export const searchDoctors = (
    req,
    res
) => {

    const {
        specialty,
        start,
        end
    } = req.query;

    const result =
        doctorService
            .searchAvailableDoctors(
                specialty,
                start,
                end
            );

    res.json(result);

};