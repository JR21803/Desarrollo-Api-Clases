export const prescriptions = {
  1: {
    id: 1,
    appointment: 1,
    diagnostic: 'Mild hypertension',
    medicine: [
      {
        name: 'Lisinopril',
        dosage: '10mg'
      }
    ],
    instructions: 'Take once daily after breakfast',
    recommendedNextAppointment: '2026-06-20',
    doctor: 1
  },

  2: {
    id: 2,
    appointment: 2,
    diagnostic: 'Chronic migraines',
    medicine: [
      {
        name: 'Sumatriptan',
        dosage: '50mg'
      }
    ],
    instructions: 'Take during migraine episodes only',
    recommendedNextAppointment: '2026-06-10',
    doctor: 2
  },

  3: {
    id: 3,
    appointment: 3,
    diagnostic: 'Ligament inflammation',
    medicine: [
      {
        name: 'Ibuprofen',
        dosage: '400mg'
      }
    ],
    instructions: 'Take every 8 hours after meals',
    recommendedNextAppointment: '2026-05-30',
    doctor: 4
  }
};