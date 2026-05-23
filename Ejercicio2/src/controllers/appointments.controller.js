import * as appointmentService from '../services/appointments.service.js';

export const createAppointment = (req, res) => {
    try {
        const appointment =
            appointmentService.createAppointment(req.body);

        res.status(201).json(appointment);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const getAllAppointments = (req, res) => {
    try {
        const appointments = appointmentService.getAllAppointments()

        res.status(200).json(appointments)
    }

    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const getAppointmentById = (req, res) => {
    try{
        const {id} = req.params

        const appointment = appointmentService.getAppointmentById(id)

        res.status(200).json(appointment)
    }

    catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
}

export const searchAppointments = (req,res) => {

    try{

    
    const {
        day,
        department
    } = req.query;

    const result =
        appointmentService
            .searchAppointments(
                day,
                department
            );

    res.json(result);
        }

    catch (error) {
            res.status(400).json({
                message: error.message
            });
        }

};

export const changeAppointmentState = (req, res) => {

    try{
        const {id} = req.params
        const {newState} = req.body

        const updatedAppointment = appointmentService.changeAppointmentState(id, newState);

        res.status(200).json(updatedAppointment);
    }

    catch (error) {
            res.status(400).json({
                message: error.message
            });
        }

}