import app from "../app.js"
import {appointments} from "../data/appointments.data.js"
import { generateId } from "../utils/generateId.js"
import { validateDoctorAvailability }from '../utils/validateDoctorAvailability.js';
import { doctors } from '../data/doctors.data.js';
import { patients } from '../data/patients.data.js';

import DoctorStatus from '../enums/doctorStatus.enum.js';
import AppointmentStatus from '../enums/appointmentStatus.enum.js';

export const getAllAppointments = () => {
    return Object.values(appointments);
};

export const getAppointmentById = (id) => {
    const appointment = appointments[id];

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    return appointment;
};

export const createAppointment = (
    appointmentData
) => {

    const {
        patient,
        doctor,
        dateTime,
        reason,
        department
    } = appointmentData;


    if (!patients[patient]) {
        throw new Error(
            'Patient does not exist'
        );
    }


    const selectedDoctor =
        doctors[doctor];

    if (!selectedDoctor) {
        throw new Error(
            'Doctor does not exist'
        );
    }


    if (
        selectedDoctor.state !==
        DoctorStatus.ACTIVE
    ) {
        throw new Error(
            `Doctor unavailable: ${selectedDoctor.state}`
        );
    }


    validateDoctorAvailability(
        selectedDoctor,
        dateTime
    );


    const existingAppointment =
        Object.values(appointments)
            .find(
                appointment =>
                    appointment.doctor === doctor &&
                    appointment.dateTime === dateTime &&
                    appointment.state !==
                    AppointmentStatus.CANCELLED
            );

    if (existingAppointment) {
        throw new Error(
            'Doctor already has an appointment at that time'
        );
    }

    const newId = generateId(appointments)

    const newAppointment = {
        id: newId,
        patient,
        doctor,
        dateTime,
        reason,
        state:
            AppointmentStatus.SCHEDULED,
        department
    };

    appointments[newId] =
        newAppointment;

    return newAppointment;
};

export const searchAppointments = (
    day,
    department
) => {

    return Object.values(appointments)
        .filter(appointment => {

            const appointmentDate =
                appointment.dateTime
                    .split('T')[0];

            const matchesDay =
                !day ||
                appointmentDate === day;

            const matchesDepartment =
                !department ||
                appointment.department
                    .toLowerCase() ===
                department.toLowerCase();

            return (
                matchesDay &&
                matchesDepartment
            );

        })

        .sort(
            (a,b) =>
                new Date(a.dateTime) -
                new Date(b.dateTime)
        );

};
export const changeAppointmentState = (id, newState) => {
    const appointment = appointments[id];

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    if (!(appointment["state"]==AppointmentStatus.SCHEDULED)){
        throw new Error('Invalid State');
    }

    appointments[id]["state"] = newState

    return appointments[id];


}