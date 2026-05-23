export const validateDoctorAvailability = (
    doctor,
    appointmentDateTime
) => {

    const date = new Date(appointmentDateTime);

    const appointmentDay = date.toLocaleDateString(
        'en-US',
        {
            weekday: 'long'
        }
    );

    const appointmentTime =
        date.toTimeString().slice(0, 5);


    const daySchedule =
        doctor.availabilitySchedule.find(
            schedule =>
                schedule.startsWith(appointmentDay)
        );

    if (!daySchedule) {
        throw new Error(
            `Doctor does not work on ${appointmentDay}`
        );
    }



    const [, timeRange] =
        daySchedule.split(' ');

    const [startTime, endTime] =
        timeRange.split('-');

    if (
        appointmentTime < startTime ||
        appointmentTime > endTime
    ) {
        throw new Error(
            `Doctor only works from ${startTime} to ${endTime}`
        );
    }

    return true;
};