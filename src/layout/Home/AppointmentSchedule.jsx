import { useEffect, useState } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";

const AppointmentSchedule = () => {
  const location = useLocation();
  const examType = location.state?.examType; // exam type comes from homepage
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
      !examType || doc.exam_section?.toLowerCase() === examType?.toLowerCase();

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
      <div className="bg-gradient-to-r from-black via-red-600 to-black py-12 md:py-20 text-center px-4 sm:px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
          {examType || "Appointment Schedule"}
        </h1>
        <p className="text-center text-base md:text-xl text-white mb-2">
          Select your eye care professional and appointment time.
        </p>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-12 space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:space-x-3 w-full sm:w-auto px-0 sm:px-0">
            {/* Select filter type */}
            <select
              className="border px-3 py-2 rounded-lg text-sm w-full sm:w-auto"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>Professional</option>
              <option>Date</option>
            </select>

            {/* Doctor filter */}
            {filterType === "Professional" && (
              <select
                className="border px-3 py-2 rounded-lg text-sm w-full sm:w-auto mt-2 sm:mt-0"
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
                className="border px-3 py-2 rounded-lg text-sm w-full sm:w-auto mt-2 sm:mt-0"
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
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start w-full sm:space-x-6 space-y-6 sm:space-y-0"
            >
              {/* Doctor */}
              <div className="flex flex-row sm:flex-col items-center sm:items-center w-full sm:w-32 px-4 sm:px-0">
                <img
                  src={IMAGE_URL + doc.image}
                  alt={doc.doctor_name}
                  className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover mb-0 sm:mb-4 shadow border border-red-600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="ml-4 sm:ml-0 text-left sm:text-center">
                  <h4 className="font-bold text-sm uppercase">
                    {doc.doctor_name}
                  </h4>
                  <p className="text-xs text-gray-500">{doc.specialization}</p>
                </div>
              </div>

              {/* Schedule Grid */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-7 px-4 sm:px-0">
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
                              className="w-full sm:w-auto"
                            >
                              <button
                                onClick={() =>
                                  setSelectedTime(
                                    `${doc.doctor_name} - ${day.label} - ${time}`
                                  )
                                }
                                className={`block w-full sm:inline-block px-3 py-2 text-white text-xs font-medium rounded-sm transition 
                                  ${selectedTime ===
                                  `${doc.doctor_name} - ${day.label} - ${time}`
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
        <div className="flex justify-center items-center space-x-6 mt-8 mb-8 px-4">
          <button
            disabled={startIndex === 0}
            onClick={() => setStartIndex(startIndex - 1)}
            className="px-4 py-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
          >
            <FaLongArrowAltLeft />
          </button>
          <button
            disabled={startIndex + 4 >= days.length}
            onClick={() => setStartIndex(startIndex + 1)}
            className="px-4 py-3 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-40"
          >
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedule;
