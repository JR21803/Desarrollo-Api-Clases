import { patients } from '../data/patients.data.js';
import { generateId } from '../utils/generateId.js';

export const getAllPatients = () => {
    return Object.values(patients);
};

export const getPatientById = (id) => {
    const patient = patients[id];

    if (!patient) {
        throw new Error('Patient not found');
    }

    return patient;
};

export const createPatient = (patientData) => {
    const newId = generateId(patients);

    const newPatient = {
        id: newId,
        ...patientData
    };

    patients[newId] = newPatient;

    return newPatient;
};

export const updatePatient = (id, patientData) => {
    if (!patients[id]) {
        throw new Error('Patient not found');
    }

    patients[id] = {
        ...patients[id],
        ...patientData
    };

    return patients[id];
};

export const deletePatient = (id) => {
    if (!patients[id]) {
        throw new Error('Patient not found');
    }

    const deletedPatient = patients[id];

    delete patients[id];

    return deletedPatient;
};

export const searchPatients = (
    patientName, patientDui
) => {

    if (!patientName && !patientDui) {
        return [];
    }


    return Object.values(patients)
        .filter(patient => {    


                const matchesName = patient["name"].toLowerCase() == patientName.toLowerCase() || !patientName

                const matchesDui = patient["dui"].toLowerCase() == patientDui.toLowerCase() || !patientDui

                return (matchesName && matchesDui)
        }
                );

};