import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentType = () => {

    const navigate = useNavigate();


  const appointments = [
    {
      title: "FULL EYE EXAM",
      description:
        "Please arrive 10 mins before your appointment for your pre-test. The eye exam fee is $95. If you also require contact lens fitting with your eye exam, the fitting fee will be an additional $30-50",
    },
    {
      title: "SENIOR FULL EYE EXAM - COVERED",
      description:
        "Patients 65 and over are eligible for OHIP covered exam once per year. Please bring valid OHIP card to the appointment and arrive 10 mins early for pre-testing.",
    },
    {
      title: "CHILD FULL EYE EXAM - COVERED",
      description:
        "Children 19 years of age and under are eligible for an OHIP covered exam once per year. Please bring your valid OHIP card and arrive 10 minutes before your appointment for pre-testing.",
    },
    {
      title: "FULL EYE EXAM 20-64 MEDICAL",
      description:
        "If you have diabetes or certain eye diseases, you are eligible for an OHIP covered eye exam once per year. New Patients, please bring either a doctor’s note or official medication list and OHIP card.",
    },
  ];


  const handleSelect = (title) => {
    navigate("/AppointmentSchedule", {state: {examType: title}})
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Dr. Yuen Optometry</h1>
      <p className="text-center mb-10">
        In case of emergency, please call: <span className="font-semibold">416-205-9539</span>
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="border shadow-md rounded-lg p-6 flex flex-col justify-between"
          >
            <h2 className="text-lg font-bold mb-3 text-center">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-6">{item.description}</p>
            <button
            onClick={()=>handleSelect(item.title)}
             className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold">
              SELECT
            </button>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <div className="mt-10 space-y-4 text-sm text-gray-700">
        <p className="font-semibold">
          The day of your appointment:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Please arrive 15 minutes early to allow for preliminary testing.</li>
          <li>Please kindly wear mask to appointment.</li>
          <li>
            If you have a cough, cold, difficulty breathing, sore throat, fever,
            please seek medical attention before booking.
          </li>
        </ul>

        <ul className="list-disc list-inside space-y-1 mt-4">
          <li>Please bring your medication list.</li>
          <li>Please bring all pairs of glasses that you currently use.</li>
          <li>
            If you are a contact lens wearer, please wear your glasses to the
            appointment (if available), and bring your contact lens boxes/foils.
          </li>
          <li>Please bring your Medicare card (OHIP Card).</li>
          <li>Appointments will last 20-40 minutes.</li>
          <li>Dilation drops used as part of examination.</li>
          <li>Cash payment not accepted (only credit/debit card).</li>
        </ul>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        © Atal Opticals - Cookie Policy
      </p>
    </div>
  );
};

export default AppointmentType;
