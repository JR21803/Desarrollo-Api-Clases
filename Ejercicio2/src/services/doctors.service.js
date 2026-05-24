import { doctors } from '../data/doctors.data.js';
import DoctorStatus from '../enums/doctorStatus.enum.js';

export const getAllDoctors = () => {
    return Object.values(doctors);
};

export const getDoctorById = (id) => {
    const doctor = doctors[id];

    if (!doctor) {
        throw new Error('Doctor not found');
    }

    return doctor;
};

export const createDoctor = (doctorData) => {
    const ids = Object.keys(doctors).map(Number);

    const newId = ids.length
        ? Math.max(...ids) + 1
        : 1;

    const newDoctor = {
        id: newId,
        ...doctorData
    };

    doctors[newId] = newDoctor;

    return newDoctor;
};

export const updateDoctor = (id, doctorData) => {
    if (!doctors[id]) {
        throw new Error('Doctor not found');
    }

    doctors[id] = {
        ...doctors[id],
        ...doctorData
    };

    return doctors[id];
};

export const deleteDoctor = (id) => {
    if (!doctors[id]) {
        throw new Error('Doctor not found');
    }

    const deletedDoctor = doctors[id];

    delete doctors[id];

    return deletedDoctor;
};

export const searchAvailableDoctors = (
    specialty,
    start,
    end
) => {

    return Object.values(doctors)
        .filter(doctor => {


            if (
                doctor.state !==
                DoctorStatus.ACTIVE
            ) {
                return false;
            }


            if (
                specialty &&
                doctor.specialty.toLowerCase() !==
                specialty.toLowerCase()
            ) {
                return false;
            }


            const hasAvailability =
                doctor.availabilitySchedule.some(
                    schedule => {


                        const [, timeRange] =
                            schedule.split(' ');

                        const [
                            doctorStart,
                            doctorEnd
                        ] =
                            timeRange.split('-');

                        return (
                            doctorStart <= start &&
                            doctorEnd >= end
                        );
                    }
                );

            return hasAvailability;

        });

};