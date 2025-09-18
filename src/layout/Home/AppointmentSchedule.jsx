import { Divide } from "lucide-react";
import React, { useState } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AppointmentSchedule = () => {
  const location = useLocation();
  const examType = location.state?.examType;
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

  const doctors = [
    {
      name: "DR. MELISSA YUEN",
      image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg",
      schedule: {
        Monday: [
          "10:20 AM",
          "11:00 AM",
          "11:20 AM",
          "2:00 PM",
          "3:00 PM",
          "5:00 PM",
        ],
        Tuesday: ["12:40 PM", "1:20 PM", "2:00 PM", "2:20 PM"],
        Wednesday: ["4:00 PM", "4:20 PM", "4:40 PM", "5:00 PM"],
        Thursday: [
          "10:20 AM",
          "11:00 AM",
          "11:20 AM",
          "2:00 PM",
          "3:00 PM",
          "5:00 PM",
        ],
        Friday: ["11:40 AM", "12:00 PM", "12:20 PM"],
        Saturday: ["12:00 PM", "12:20 PM", "1:20 PM"],
        Sunday: ["3:00 PM", "3:40 PM", "4:00 PM"],
      },
    },
    {
      name: "DR. EMMA KARLIN",
      image:
        "https://images.pexels.com/photos/6749787/pexels-photo-6749787.jpeg",
      schedule: {
        Monday: ["No availability"],
        Tuesday: ["11:40 AM", "12:00 PM", "12:20 PM", "2:20 PM"],
        Wednesday: ["12:00 PM", "12:20 PM", "1:20 PM", "1:40 PM", "2:40 PM"],
        Thursday: [
          "11:40 AM",
          "12:20 PM",
          "1:00 PM",
          "2:00 PM",
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
        ],
        Friday: ["10:20 AM", "11:00 AM"],
        Saturday: [
          "11:40 AM",
          "12:20 PM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
        ],
        Sunday: ["No availability"],
      },
    },
    {
      name: "DR. EKOW HUGHES",
      image:
        "https://images.pexels.com/photos/5996702/pexels-photo-5996702.jpeg",
      schedule: {
        Monday: ["2:00 PM", "2:20 PM", "3:00 PM"],
        Tuesday: ["No availability"],
        Wednesday: ["11:40 AM", "12:20 PM"],
        Thursday: [
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "1:20 PM",
          "2:20 PM",
          "3:00 PM",
          "5:00 PM",
          "6:00 PM",
        ],
        Friday: ["No availability"],
        Saturday: ["3:00 PM", "3:40 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
        Sunday: ["No availability"],
      },
    },
  ];

  const [selectedTime, setSelectedTime] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [filterType, setFilterType] = useState("Professional");
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");

  // Show 4 days at a time
  const visibleDays = days.slice(startIndex, startIndex + 4);

  // Filter doctors
  const filteredDoctors =
    selectedDoctor === "All"
      ? doctors
      : doctors.filter((doc) => doc.name === selectedDoctor);

  return (
    <div>
      <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-2">{examType}</h1>
        <p className="text-center text-xl text-white mb-2">
          Select your eye care professional and appointment time.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filter Section */}
        <div className="flex justify-end items-center mb-12">
          <div className="flex space-x-3">
            <select
              className="border px-3 py-2 rounded-lg text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>Professional</option>
              <option>Date</option>
            </select>

            {filterType === "Professional" && (
              <select
                className="border px-3 py-2 rounded-lg text-sm"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option>All</option>
                {doctors.map((doc, i) => (
                  <option key={i}>{doc.name}</option>
                ))}
              </select>
            )}

            {filterType === "Date" && (
              <select
                className="border px-3 py-2 rounded text-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option>All</option>
                {days.map((day, i) => (
                  <option key={i}>{day.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Doctors */}
        <div className="space-y-12">
          {filteredDoctors.map((doc, index) => (
            <div key={index} className="flex items-start space-x-6">
              {/* Doctor */}
              <div className="flex flex-col items-center">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
                <h4 className="font-bold text-sm">{doc.name}</h4>
              </div>

              {/* Schedule Grid */}
              <div className="flex-1 grid grid-cols-4 gap-7">
                {visibleDays
                  .filter(
                    (day) =>
                      selectedDate === "All" || day.label === selectedDate
                  )
                  .map((day) => {
                    const times = doc.schedule[day.weekday] || [
                      "No availability",
                    ];
                    return (
                      <div key={day.key}>
                        <p className="font-semibold text-sm mb-2 text-center">
                          {day.label}
                        </p>
                        {times.includes("No availability") ? (
                          <p className="text-gray-400 text-sm text-center">
                            No availability
                          </p>
                        ) : (
                          <div className="grid grid-cols-3 gap-1">
                            {times.map((time, tIdx) => (
                              <Link
                                to="/book-eye-exam"
                                state={{
                                  doctorName: doc.name,
                                  doctorImage: doc.image,
                                  day: day.label,
                                  weekday: day.weekday,
                                  time,
                                  examType,
                                }}
                                  key={tIdx}
                              >
                                <button
                                  key={tIdx}
                                  onClick={() =>
                                    setSelectedTime(
                                      `${doc.name} - ${day.label} - ${time}`
                                    )
                                  }
                                  className={`px-2 py-1 text-white text-xs font-medium ${
                                    selectedTime ===
                                    `${doc.name} - ${day.label} - ${time}`
                                      ? "bg-red-600"
                                      : "bg-gray-700 hover:bg-red-600"
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
        <div className="flex justify-center items-center space-x-6 mt-8">
          <button
            disabled={startIndex === 0}
            onClick={() => setStartIndex(startIndex - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            <FaLongArrowAltLeft />
          </button>
          <button
            disabled={startIndex + 4 >= days.length}
            onClick={() => setStartIndex(startIndex + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            <FaLongArrowAltRight />
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-10">
          © Atal Opticals - Cookie Policy
        </p>
      </div>
    </div>
  );
};

export default AppointmentSchedule;
