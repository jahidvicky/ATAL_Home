import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";

const AppointmentSchedule = () => {
  const location = useLocation();
  const examType = location.state?.examType;   // exam type comes from homepage
  const today = new Date();

  // Generate 7 days from today
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      label: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      key: date.toDateString(),
    };
  });

  const [selectedTime, setSelectedTime] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [filterType, setFilterType] = useState("Professional");
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [doctor, setDoctor] = useState([]);

  // Show 4 days at a time
  const visibleDays = days.slice(startIndex, startIndex + 4);

  // Fetch doctors from API
  const fetchDoctor = async () => {
    try {
      const res = await API.get("/getDoctor");
      setDoctor(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  // Filter doctors
  const filteredDoctors = doctor.filter((doc) => {
    // filter by exam type (only doctors who belong to this exam)
    const matchExam =
      !examType ||
      doc.exam_section?.toLowerCase() === examType?.toLowerCase();

    const matchDoctor =
      selectedDoctor === "All" || doc.doctor_name === selectedDoctor;

    const matchDate =
      selectedDate === "All" ||
      doc.schedule.some((sch) => sch.day === selectedDate);

    return matchExam && matchDoctor && matchDate;
  });

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-2">
          {examType || "Appointment Schedule"}
        </h1>
        <p className="text-center text-xl text-white mb-2">
          Select your eye care professional and appointment time.
        </p>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filter Section */}
        <div className="flex justify-end items-center mb-12">
          <div className="flex space-x-3">
            {/* Select filter type */}
            <select
              className="border px-3 py-2 rounded-lg text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>Professional</option>
              <option>Date</option>
            </select>

            {/* Doctor filter */}
            {filterType === "Professional" && (
              <select
                className="border px-3 py-2 rounded-lg text-sm"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option>All</option>
                {doctor.map((doc, i) => (
                  <option key={i}>{doc.doctor_name}</option>
                ))}
              </select>
            )}

            {/* Date filter */}
            {filterType === "Date" && (
              <select
                className="border px-3 py-2 rounded text-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option>All</option>
                {days.map((day, i) => (
                  <option key={i} value={day.weekday}>
                    {day.weekday}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Doctors */}
        <div className="space-y-12">
          {filteredDoctors.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              No doctors available for this exam.
            </p>
          )}

          {filteredDoctors.map((doc, index) => (
            <div key={index} className="flex items-start space-x-6">
              {/* Doctor */}
              <div className="flex flex-col items-center w-32">
                <img
                  src={IMAGE_URL + doc.image}
                  alt={doc.doctor_name}
                  className="w-12 h-12 rounded-full object-cover mb-4 shadow border border-red-600"
                  loading="lazy"
                  decoding="async"
                />
                <h4 className="font-bold text-sm text-center uppercase">
                  {doc.doctor_name}
                </h4>
                <p className="text-xs text-gray-500 text-center">
                  {doc.specialization}
                </p>
              </div>

              {/* Schedule Grid */}
              <div className="flex-1 grid grid-cols-4 gap-7">
                {visibleDays.map((day) => {
                  const scheduleForDay = doc.schedule.find(
                    (sch) => sch.day === day.weekday
                  );

                  const times =
                    scheduleForDay?.status === "Available"
                      ? scheduleForDay.times
                      : ["No availability"];

                  return (
                    <div key={day.key} className="text-center">
                      <p className="font-semibold text-sm mb-2">{day.label}</p>
                      {times.includes("No availability") ? (
                        <p className="text-gray-400 text-sm">No availability</p>
                      ) : (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {times.map((time, tIdx) => (
                            <Link
                              to="/book-eye-exam"
                              state={{
                                doctorName: doc.doctor_name,
                                doctorImage: doc.image,
                                day: day.label,
                                weekday: day.weekday,
                                time,
                                examType,
                              }}
                              key={tIdx}
                            >
                              <button
                                onClick={() =>
                                  setSelectedTime(
                                    `${doc.doctor_name} - ${day.label} - ${time}`
                                  )
                                }
                                className={`px-4 py-2 text-white text-xs font-medium rounded-sm transition hover:cursor-pointer 
                                  ${selectedTime === `${doc.doctor_name} - ${day.label} - ${time}`
                                    ? "bg-[#f00000]"
                                    : "bg-gray-800 hover:bg-[#f00000]"
                                  }`}
                              >
                                {time}
                              </button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            disabled={startIndex === 0}
            onClick={() => setStartIndex(startIndex - 1)}
            className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
          >
            <FaLongArrowAltLeft />
          </button>
          <button
            disabled={startIndex + 4 >= days.length}
            onClick={() => setStartIndex(startIndex + 1)}
            className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
          >
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedule;
