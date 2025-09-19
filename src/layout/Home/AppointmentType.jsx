import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    navigate("/appointmentSchedule", { state: { examType: title } })
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Children animation (applied to each <li>)
  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Dr. Yuen Optometry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {appointments.map((item, index) => (
          <motion.div
            key={index}
            className="border shadow-lg hover:shadow-red-600 rounded-lg p-6 flex flex-col justify-between"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-lg font-bold mb-3 text-center">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-6">{item.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(item.title)}
              className="bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer py-2 px-4 rounded font-semibold"
            >
              SELECT
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-10 space-y-4 text-sm text-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-semibold">The day of your appointment:</p>

        {/* First List */}
        <motion.ul
          className="list-disc list-inside space-y-1"
          variants={listVariants}
        >
          <motion.li variants={itemVariants}>
            Please arrive 15 minutes early to allow for preliminary testing.
          </motion.li>
          <motion.li variants={itemVariants}>
            Please kindly wear mask to appointment.
          </motion.li>
          <motion.li variants={itemVariants}>
            If you have a cough, cold, difficulty breathing, sore throat, fever,
            please seek medical attention before booking.
          </motion.li>
        </motion.ul>

        {/* Second List */}
        <motion.ul
          className="list-disc list-inside space-y-1 mt-4"
          variants={listVariants}
        >
          <motion.li variants={itemVariants}>Please bring your medication list.</motion.li>
          <motion.li variants={itemVariants}>
            Please bring all pairs of glasses that you currently use.
          </motion.li>
          <motion.li variants={itemVariants}>
            If you are a contact lens wearer, please wear your glasses to the
            appointment (if available), and bring your contact lens boxes/foils.
          </motion.li>
          <motion.li variants={itemVariants}>Please bring your Medicare card (OHIP Card).</motion.li>
          <motion.li variants={itemVariants}>Appointments will last 20-40 minutes.</motion.li>
          <motion.li variants={itemVariants}>Dilation drops used as part of examination.</motion.li>
          <motion.li variants={itemVariants}>
            Cash payment not accepted (only credit/debit card).
          </motion.li>
        </motion.ul>
      </motion.div>

      <p className="text-center text-xs text-red-600 mt-6 ">
        © Atal Opticals - Cookie Policy
      </p>
    </div>
  );
};

export default AppointmentType;
