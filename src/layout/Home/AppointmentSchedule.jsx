import { useEffect, useState } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AppointmentSchedule = () => {
  const location = useLocation();
  const examType = location.state?.examType; // exam type comes from homepage
  const rescheduleOf = location.state?.rescheduleOf;
  const preselectedDoctorId = location.state?.doctorId;
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  // A slot is "in the past" only when it's on today's date AND its start
  // time has already gone by. Slots on future dates are never affected.
  const isSlotInPast = (dateISO, startTime) => {
    if (dateISO !== todayISO) return false;
    const [h, m] = startTime.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(h, m, 0, 0);
    return slotTime <= new Date();
  };

  // Generate 365 days from today (year-ahead booking)
  const days = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const iso = date.toISOString().split("T")[0];
    return {
      label: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      key: date.toDateString(),
      date: iso, // "YYYY-MM-DD" — used to query real availability
    };
  });

  const [selectedTime, setSelectedTime] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [filterType, setFilterType] = useState("Professional");
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [calendarDate, setCalendarDate] = useState(null); // NEW: actual picked Date object
  const [doctor, setDoctor] = useState([]);
  const [availability, setAvailability] = useState({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);


  useEffect(() => {
    if (rescheduleOf && preselectedDoctorId && doctor.length > 0) {
      const match = doctor.find((doc) => doc._id === preselectedDoctorId);
      if (match) setSelectedDoctor(match.doctor_name);
    }
  }, [rescheduleOf, preselectedDoctorId, doctor]);

  // Show 4 days at a time
  const visibleDays = calendarDate
    ? days.filter(
      (d) =>
        new Date(d.key).toDateString() === calendarDate.toDateString()
    )
    : days.slice(startIndex, startIndex + 4);

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

  // Fetch real availability for the visible date window, for every doctor
  const fetchAvailabilityForWindow = async (doctorList, from, to) => {
    if (!doctorList.length) return;
    setLoadingAvailability(true);
    try {
      const results = await Promise.all(
        doctorList.map((doc) =>
          API.get(`/doctor/${doc._id}/availability`, { params: { from, to } })
            .then((res) => ({ id: doc._id, data: res.data.data }))
            .catch(() => ({ id: doc._id, data: [] }))
        )
      );

      setAvailability((prev) => {
        const next = { ...prev };
        results.forEach(({ id, data }) => {
          next[id] = data;
        });
        return next;
      });
    } finally {
      setLoadingAvailability(false);
    }
  };

  // Whenever the visible window (paged 4 days, or a single calendar date)
  // or the doctor list changes, pull fresh availability for that range only
  useEffect(() => {
    if (!doctor.length) return;

    const windowDays = calendarDate
      ? days.filter((d) => new Date(d.key).toDateString() === calendarDate.toDateString())
      : days.slice(startIndex, startIndex + 4);

    if (!windowDays.length) return;

    const from = windowDays[0].date;
    const to = windowDays[windowDays.length - 1].date;

    fetchAvailabilityForWindow(doctor, from, to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctor, startIndex, calendarDate]);

  // NEW: whenever a calendar date is picked, derive its weekday
  // and feed it into the existing selectedDate filter logic
  useEffect(() => {
    if (calendarDate) {
      const weekday = calendarDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      setSelectedDate(weekday);
    } else {
      setSelectedDate("All");
    }
  }, [calendarDate]);

  // Filter doctors
  const filteredDoctors = doctor.filter((doc) => {
    // filter by exam type (only doctors who belong to this exam)
    const matchExam =
      !examType || doc.exam_section?.toLowerCase() === examType?.toLowerCase();

    const matchDoctor =
      selectedDoctor === "All" || doc.doctor_name === selectedDoctor;

    // A doctor "matches" a weekday if that weekday is one of their working
    // days (falls back to the clinic's days if no doctor-specific override)
    const workingDays = doc.workingDays?.length ? doc.workingDays : (doc.clinic?.days || []);
    const matchDate =
      selectedDate === "All" || workingDays.includes(selectedDate);

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
          {rescheduleOf
            ? "Select a new date and time for your appointment."
            : "Select your eye care professional and appointment time."}
        </p>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-end items-start mb-12 space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:space-x-3 items-start w-full sm:w-auto px-0 sm:px-0">
            {/* Select filter type */}
            <select
              className="border px-3 py-2 rounded-lg text-sm w-full sm:w-40 h-fit"
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

            {/* Date filter - now a real calendar picker */}
            {filterType === "Date" && (
              <div className="mt-2 sm:mt-0 sm:ml-3 w-fit">
                <Calendar
                  onChange={setCalendarDate}
                  value={calendarDate}
                  minDate={today}
                  maxDate={new Date(days[days.length - 1].key)} // now ~1 year out
                  className="!border !border-gray-300 !rounded-lg !text-sm !shadow-sm !font-sans"
                  tileClassName={({ date }) =>
                    date.toDateString() === today.toDateString()
                      ? "!bg-red-100 !text-[#f00000] !rounded-md"
                      : ""
                  }
                />
                {calendarDate && (
                  <button
                    type="button"
                    onClick={() => setCalendarDate(null)}
                    className="text-xs text-[#f00000] underline mt-1 block"
                  >
                    Clear date (show all)
                  </button>
                )}
              </div>
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
              <div
                className={`flex-1 grid gap-4 sm:gap-7 px-4 sm:px-0 ${calendarDate
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-4"
                  }`}
              >
                {visibleDays.map((day) => {
                  const dayAvailability = availability[doc._id]?.find(
                    (a) => a.date === day.date
                  );

                  // No entry at all means this weekday isn't a working day for this doctor
                  const slots = dayAvailability?.slots || [];

                  return (
                    <div key={day.key} className="text-center">
                      <p className="font-semibold text-sm mb-2">{day.label}</p>

                      {loadingAvailability && !dayAvailability ? (
                        <p className="text-gray-400 text-sm">Loading...</p>
                      ) : slots.length === 0 ? (
                        <p className="text-gray-400 text-sm">No availability</p>
                      ) : (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {slots.map((slot, tIdx) => {
                            const buttonKey = `${doc.doctor_name} - ${day.date} - ${slot.startTime}`;
                            const isPast = isSlotInPast(day.date, slot.startTime);

                            // Past slot (today, but the time has already gone by):
                            // shown but disabled, so the grid doesn't visually jump
                            if (isPast) {
                              return (
                                <button
                                  key={tIdx}
                                  type="button"
                                  disabled
                                  title="This time has already passed"
                                  className="block w-full sm:w-auto sm:inline-block px-3 py-2 text-gray-300 text-xs font-medium rounded-sm bg-gray-100 cursor-not-allowed line-through"
                                >
                                  {slot.startTime}
                                </button>
                              );
                            }

                            // Booked slot: shown, but disabled, greyed out, hover shows "Booked"
                            if (!slot.available) {
                              return (
                                <button
                                  key={tIdx}
                                  type="button"
                                  disabled
                                  title="Booked"
                                  className="block w-full sm:w-auto sm:inline-block px-3 py-2 text-gray-400 text-xs font-medium rounded-sm bg-gray-200 cursor-not-allowed"
                                >
                                  {slot.startTime}
                                </button>
                              );
                            }

                            // Open slot: clickable, hover shows "Available"
                            return (
                              <Link
                                to="/book-eye-exam"
                                state={{
                                  doctorId: doc._id,
                                  doctorName: doc.doctor_name,
                                  doctorImage: doc.image,
                                  day: day.label,
                                  date: day.date,
                                  weekday: day.weekday,
                                  startTime: slot.startTime,
                                  endTime: slot.endTime,
                                  examType,
                                  rescheduleOf,
                                }}
                                key={tIdx}
                                className="w-full sm:w-auto"
                              >
                                <button
                                  onClick={() => setSelectedTime(buttonKey)}
                                  title="Available"
                                  className={`block w-full sm:inline-block px-3 py-2 text-white text-xs font-medium rounded-sm transition 
                                    ${selectedTime === buttonKey
                                      ? "bg-[#f00000]"
                                      : "bg-gray-800 hover:bg-[#f00000]"
                                    }`}
                                >
                                  {slot.startTime}
                                </button>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - hidden when a single calendar date is selected */}
        {!calendarDate && (
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
        )}
      </div>
    </div>
  );
};

export default AppointmentSchedule;
