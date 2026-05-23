import { prescriptions } from '../data/prescriptions.data.js';
import { appointments } from '../data/appointments.data.js';
import { patients } from '../data/patients.data.js';
import { doctors } from '../data/doctors.data.js';
import { generateId } from '../utils/generateId.js';

export const getAllPrescriptions = () => {
    return Object.values(prescriptions);
};


export const getPrescriptionById = (id) => {
    const prescription = prescriptions[id];

    if (!prescription) {
        throw new Error(
            'Prescription not found'
        );
    }

    return prescription;
};


export const createPrescription = (
    prescriptionData
) => {

    const {
        appointment,
        diagnostic,
        medicine,
        instructions,
        recommendedNextAppointment,
        doctor
    } = prescriptionData;


    const selectedAppointment =
        appointments[appointment];

    if (!selectedAppointment) {
        throw new Error(
            'Appointment does not exist'
        );
    }

    if (!doctors[doctor]) {
        throw new Error(
            'Doctor does not exist'
        );
    }

    if (
        selectedAppointment.doctor !== doctor
    ) {
        throw new Error(
            'Doctor does not match appointment doctor'
        );
    }


    const existingPrescription =
        Object.values(prescriptions)
            .find(
                p =>
                    p.appointment === appointment
            );

    if (existingPrescription) {
        throw new Error(
            'Prescription already exists for this appointment'
        );
    }


  

    const newId = generateId(prescriptions)


    const newPrescription = {
        id: newId,
        appointment,
        diagnostic,
        medicine,
        instructions,
        recommendedNextAppointment,
        doctor
    };


    prescriptions[newId] =
        newPrescription;

    return newPrescription;
};



export const getPrescriptionsByPatient = (
    patientId
) => {


    if (!patients[patientId]) {
        throw new Error(
            'Patient not found'
        );
    }


    const patientPrescriptions =
        Object.values(prescriptions)


            .filter(prescription => {

                const appointment =
                    appointments[
                        prescription.appointment
                    ];

                return (
                    appointment &&
                    appointment.patient === patientId
                );

            })

            .sort((a, b) => {

                const appointmentA =
                    appointments[a.appointment];

                const appointmentB =
                    appointments[b.appointment];

                return (
                    new Date(
                        appointmentA.dateTime
                    ) -
                    new Date(
                        appointmentB.dateTime
                    )
                );

            })
            .map(prescription => {

                const appointment =
                    appointments[
                        prescription.appointment
                    ];

                return {
                    ...prescription,
                    appointmentDate:
                        appointment.dateTime,
                    doctorName:
                        doctors[
                            prescription.doctor
                        ].name
                };

            });


    return patientPrescriptions;
};