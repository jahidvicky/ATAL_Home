import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/Api";

const groupAppointmentHistory = (appts) => {
    const byId = {};
    appts.forEach((a) => (byId[a._id] = a));

    const referenced = new Set();
    appts.forEach((a) => {
        if (a.rescheduledFrom) referenced.add(a.rescheduledFrom);
    });

    const latestOnes = appts.filter((a) => !referenced.has(a._id));

    const groups = latestOnes.map((latest) => {
        const history = [];
        let cursorId = latest.rescheduledFrom;
        while (cursorId && byId[cursorId]) {
            history.push(byId[cursorId]);
            cursorId = byId[cursorId].rescheduledFrom;
        }
        return { latest, history };
    });

    // Most recently dated lineage first
    return groups.sort(
        (a, b) => new Date(b.latest.date) - new Date(a.latest.date)
    );
};

const MyAppointments = () => {
    const navigate = useNavigate();
    const custId = localStorage.getItem("user");

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionMsg, setActionMsg] = useState(null);
    const [expandedHistory, setExpandedHistory] = useState({});
    const [selectedGroup, setSelectedGroup] = useState(null);

    const fetchMyAppointments = async () => {
        if (!custId) return;
        try {
            setLoading(true);
            const res = await API.get(`/myAppointments/${custId}`);
            setAppointments(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch appointments:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!custId) {
            navigate("/login");
            return;
        }
        fetchMyAppointments();
    }, [custId]);

    // Only offer "reschedule" inline for admin-cancelled ones; user-cancelled
    // ones are treated as intentional and just get a "Book Again" link instead.
    const handleRebook = (appt) => {
        navigate("/appointmentSchedule", {
            state: {
                examType: appt.examType,
                doctorId: appt.doctor?._id,
                doctorName: appt.doctor?.doctor_name,
                doctorImage: appt.doctor?.image,
                rescheduleOf: appt._id, // carried through to EyeExam.jsx to trigger reschedule instead of a new booking
            },
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-2xl md:text-3xl font-bold text-[#f00000] mb-6 text-center">
                My Appointments
            </h1>

            {actionMsg && (
                <div
                    className={`mb-4 px-4 py-2 rounded text-sm ${actionMsg.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {actionMsg.text}
                </div>
            )}

            {loading ? (
                <p className="text-center text-gray-500">Loading your appointments...</p>
            ) : appointments.length === 0 ? (
                <p className="text-center text-gray-500">You have no appointments yet.</p>
            ) : (
                <div className="space-y-4">
                    {groupAppointmentHistory(appointments).map(({ latest, history }) => {
                        const isExpanded = !!expandedHistory[latest._id];

                        return (
                            <div
                                key={latest._id}
                                onClick={() => setSelectedGroup({ latest, history })}
                                className="border rounded-lg shadow-sm p-4 cursor-pointer hover:border-[#f00000] transition-colors"
                            >
                                {/* Current / latest appointment */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <p className="font-semibold">
                                            {latest.doctor?.doctor_name || "Doctor"} — {latest.examType}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {latest.weekday}, {latest.date} at {latest.startTime}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Booked for: {latest.firstName} {latest.lastName}
                                        </p>
                                        <p
                                            className={`text-sm font-medium mt-1 ${latest.status === "cancelled"
                                                ? "text-red-500"
                                                : latest.status === "rescheduled"
                                                    ? "text-yellow-600"
                                                    : "text-green-600"
                                                }`}
                                        >
                                            {latest.status}
                                            {latest.status === "cancelled" && latest.cancelledBy === "admin" && (
                                                <span className="text-gray-400 font-normal"> (cancelled by clinic)</span>
                                            )}
                                            {history.length > 0 && (
                                                <span className="text-gray-400 font-normal"> · {history.length} earlier {history.length === 1 ? "version" : "versions"}</span>
                                            )}
                                        </p>
                                    </div>

                                    <div
                                        className="flex flex-col items-end gap-1"
                                        onClick={(e) => e.stopPropagation()} // keep buttons from also opening the modal
                                    >
                                        {latest.status === "booked" && (
                                            <p className="text-xs text-gray-500 max-w-[180px] text-right">
                                                To cancel or reschedule, please call us at{" "}
                                                <span className="font-semibold">1866-242-3545</span> or email{" "}
                                                <span className="font-semibold">info.ataloptical@gmail.com</span>.
                                            </p>
                                        )}

                                        {latest.status === "cancelled" && latest.cancelledBy === "admin" && (
                                            <button
                                                onClick={() => handleRebook(latest)}
                                                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900"
                                            >
                                                Reschedule
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Detail Modal */}
            {selectedGroup && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedGroup(null)}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h2 className="text-lg font-bold text-[#f00000]">Appointment Details</h2>
                            <button
                                onClick={() => setSelectedGroup(null)}
                                className="text-gray-400 hover:text-black text-xl leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="px-6 py-5 space-y-5">
                            {/* Current appointment */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                                    Current
                                </p>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
                                    <p><span className="font-semibold">Doctor:</span> {selectedGroup.latest.doctor?.doctor_name || "-"}</p>
                                    <p><span className="font-semibold">Exam Type:</span> {selectedGroup.latest.examType}</p>
                                    <p><span className="font-semibold">Date & Time:</span> {selectedGroup.latest.weekday}, {selectedGroup.latest.date} at {selectedGroup.latest.startTime}</p>
                                    <p><span className="font-semibold">Patient Name:</span> {selectedGroup.latest.firstName} {selectedGroup.latest.lastName}</p>
                                    <p><span className="font-semibold">Gender:</span> {selectedGroup.latest.gender || "-"}</p>
                                    <p><span className="font-semibold">Date of Birth:</span> {selectedGroup.latest.dob || "-"}</p>
                                    <p><span className="font-semibold">Phone:</span> {selectedGroup.latest.phone || "-"}</p>
                                    <p className="break-words"><span className="font-semibold">Email:</span> {selectedGroup.latest.email || "-"}</p>
                                    <p>
                                        <span className="font-semibold">Status:</span>{" "}
                                        <span
                                            className={
                                                selectedGroup.latest.status === "cancelled"
                                                    ? "text-red-500"
                                                    : "text-green-600"
                                            }
                                        >
                                            {selectedGroup.latest.status}
                                        </span>
                                        {selectedGroup.latest.status === "cancelled" && selectedGroup.latest.cancelledBy === "admin" && (
                                            <span className="text-gray-400"> (cancelled by clinic)</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Reschedule history, if any */}
                            {selectedGroup.history.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                                        History ({selectedGroup.history.length} earlier {selectedGroup.history.length === 1 ? "version" : "versions"})
                                    </p>
                                    <div className="space-y-3">
                                        {selectedGroup.history.map((h, hIdx) => (
                                            <div key={h._id} className="border rounded-lg p-4 space-y-1 text-sm">
                                                <p className="font-semibold text-gray-700 mb-1">
                                                    {hIdx === selectedGroup.history.length - 1 ? "Originally booked" : "Rescheduled slot"}
                                                </p>
                                                <p><span className="font-semibold">Doctor:</span> {h.doctor?.doctor_name || "-"}</p>
                                                <p><span className="font-semibold">Exam Type:</span> {h.examType}</p>
                                                <p><span className="font-semibold">Date & Time:</span> {h.weekday}, {h.date} at {h.startTime}</p>
                                                <p><span className="font-semibold">Patient Name:</span> {h.firstName} {h.lastName}</p>
                                                <p><span className="font-semibold">Gender:</span> {h.gender || "-"}</p>
                                                <p><span className="font-semibold">Date of Birth:</span> {h.dob || "-"}</p>
                                                <p><span className="font-semibold">Phone:</span> {h.phone || "-"}</p>
                                                <p className="break-words"><span className="font-semibold">Email:</span> {h.email || "-"}</p>
                                                <p className="text-red-400">
                                                    cancelled
                                                    {h.cancelledBy === "admin" ? " (by clinic)" : h.cancelledBy === "user" ? " (by you)" : ""}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;