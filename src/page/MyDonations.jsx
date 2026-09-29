import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../API/Api";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);

const fmtDate = (d) =>
    d ? dayjs(d, "YYYYMMDD").format("dddd, MMM D, YYYY") : "N/A";

const fmtTime = (t) =>
    t && String(t).length === 4
        ? `${String(t).slice(0, 2)}:${String(t).slice(2)}`
        : t || "N/A";

const getStatusText = (status) => {
    switch (status) {
        case "PENDING":
            return "Pickup Pending";
        case "ARRANGED":
            return "Pickup Scheduled";
        case "PICKED_UP":
            return "Picked Up";
        case "FAILED":
            return "Pickup Failed";
        case "CANCELLED":
            return "Cancelled";
        default:
            return status || "Pending";
    }
};

const getStatusClass = (status) => {
    switch (status) {
        case "PENDING":
            return "bg-yellow-100 text-yellow-700";
        case "ARRANGED":
            return "bg-blue-100 text-blue-700";
        case "PICKED_UP":
            return "bg-green-100 text-green-700";
        case "FAILED":
            return "bg-red-100 text-red-700";
        case "CANCELLED":
            return "bg-gray-200 text-gray-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const getImages = (item) => {
    if (Array.isArray(item?.frameImages) && item.frameImages.length > 0) {
        return item.frameImages;
    }
    if (item?.frameImage) return [item.frameImage];
    return [];
};

const StatusBadge = ({ status }) => (
    <span
        className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
            status
        )}`}
    >
        {getStatusText(status)}
    </span>
);

// One label/value row inside the details table
const DetailRow = ({ label, children }) => (
    <tr>
        <th className="w-44 border border-gray-200 bg-gray-50 p-2 text-left align-top text-sm font-semibold text-gray-700">
            {label}
        </th>
        <td className="border border-gray-200 p-2 text-sm text-gray-900 break-words">
            {children}
        </td>
    </tr>
);

const MyDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [zoomImage, setZoomImage] = useState(null);

    const navigate = useNavigate();

    const getUserId = () => {
        const raw = localStorage.getItem("user");
        if (!raw) return "";

        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") {
                return parsed._id || parsed.id || parsed.user?._id || "";
            }
            return String(parsed);
        } catch {
            // localStorage stores the plain user ID
            return raw;
        }
    };

    const fetchMyDonations = async () => {
        try {
            setLoading(true);

            const userId = getUserId();

            if (!userId) {
                throw new Error("Please log in to see your donations");
            }

            const response = await API.get(
                `/community/my-donations/${userId}`
            );

            const list = response.data?.donations || [];
            setDonations(list);

            // keep an open popup in sync if the list refreshes
            setSelected((prev) =>
                prev ? list.find((d) => d._id === prev._id) || prev : prev
            );
        } catch (error) {
            console.error("My Donations Error:", error);

            Swal.fire(
                "Error",
                error.response?.data?.message ||
                error.message ||
                "Unable to load your donations",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyDonations();
    }, []);

    // Stop the page behind from scrolling while the details popup is open
    useEffect(() => {
        if (!selected) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [selected]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-gray-600">
                    Loading your donations...
                </p>
            </div>
        );
    }

    const images = getImages(selected);

    return (
        <div className="max-w-6xl mx-auto px-5 py-10">

            {/* IMAGE ZOOM MODAL (only closes the zoomed image, never the details popup) */}
            {zoomImage && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60]"
                    onClick={() => setZoomImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] p-4">
                        <img
                            src={zoomImage}
                            alt="Zoomed Frame"
                            className="max-h-[90vh] max-w-full object-contain rounded"
                        />
                        <button
                            onClick={() => setZoomImage(null)}
                            className="absolute top-4 right-6 text-black text-xl font-bold"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#f00000]">
                        My Donations
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Track your donated frames and pickup status.
                    </p>
                </div>

                <button
                    onClick={fetchMyDonations}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                    Refresh
                </button>
            </div>

            {donations.length === 0 ? (
                <div className="bg-white border rounded-xl p-10 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        No Donations Yet
                    </h2>

                    <p className="text-gray-500 mb-5">
                        You haven't submitted any frame donations.
                    </p>

                    <button
                        onClick={() => navigate("/our-community")}
                        className="bg-[#f00000] text-white px-5 py-2 rounded"
                    >
                        Donate Frames
                    </button>
                </div>
            ) : (
                <div className="overflow-auto max-h-[70vh] rounded border border-gray-300">
                    <table className="w-full table-auto border-collapse">
                        <thead className="text-white">
                            <tr>
                                <th className="sticky top-0 z-10 bg-black border border-gray-700 p-3 text-left">Frame Type</th>
                                <th className="sticky top-0 z-10 bg-black border border-gray-700 p-3 text-center">Quantity</th>
                                <th className="sticky top-0 z-10 bg-black border border-gray-700 p-3 text-center">Status</th>
                                <th className="sticky top-0 z-10 bg-black border border-gray-700 p-3 text-center">Submitted</th>
                            </tr>
                        </thead>

                        <tbody>
                            {donations.map((donation) => (
                                // Clicking anywhere on the row opens that donation's details
                                <tr
                                    key={donation._id}
                                    onClick={() => setSelected(donation)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") setSelected(donation);
                                    }}
                                    tabIndex={0}
                                    className="cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:outline-none"
                                >
                                    <td className="border p-3 text-left">{donation.frameType}</td>
                                    <td className="border p-3 text-center">
                                        {donation.frameQuantity ?? "Not recorded"}
                                    </td>
                                    <td className="border p-3 text-center">
                                        <StatusBadge status={donation.pickupStatus} />
                                    </td>
                                    <td className="border p-3 text-center whitespace-nowrap">
                                        {new Date(donation.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* DETAILS MODAL
                No click-outside or Escape handler on purpose:
                it stays open until the Close button (or ✕) is clicked. */}
            {selected && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Donation details"
                >
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
                        {/* Header (always visible) */}
                        <div className="flex items-center justify-between gap-3 border-b px-6 py-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-[#f00000]">
                                    Frame Donation
                                </h2>
                                <StatusBadge status={selected.pickupStatus} />
                            </div>

                            <button
                                onClick={() => setSelected(null)}
                                className="text-gray-600 hover:text-black text-xl leading-none"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                            {/* Donation details */}
                            <table className="w-full border-collapse">
                                <tbody>
                                    <DetailRow label="Frame type">
                                        {selected.frameType}
                                    </DetailRow>
                                    <DetailRow label="Quantity donated">
                                        <span className="font-semibold">
                                            {selected.frameQuantity ?? "Not recorded"}
                                        </span>
                                    </DetailRow>
                                    <DetailRow label="Submitted on">
                                        {new Date(selected.createdAt).toLocaleString()}
                                    </DetailRow>
                                </tbody>
                            </table>

                            {/* Images */}
                            <div>
                                <h3 className="mb-2 text-lg font-bold">
                                    Frame images ({images.length})
                                </h3>

                                {images.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No images were uploaded for this donation.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {images.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={`${IMAGE_URL}${img}`}
                                                alt={`Frame ${idx + 1}`}
                                                className="h-32 w-full object-contain border rounded cursor-pointer hover:scale-105 transition"
                                                onClick={() => setZoomImage(`${IMAGE_URL}${img}`)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Pickup information */}
                            <div className="bg-gray-50 rounded-lg p-5">
                                <h3 className="font-bold text-lg mb-4">
                                    Pickup Information
                                </h3>

                                {selected.pickupStatus === "PENDING" && (
                                    <p className="text-yellow-700">
                                        Your donation has been received.
                                        Our team will arrange the free
                                        Loomis pickup.
                                    </p>
                                )}

                                {selected.pickupStatus === "ARRANGED" && (
                                    <div className="space-y-2">
                                        <p>
                                            <b>Pickup Date:</b>{" "}
                                            {fmtDate(selected.pickupDate)}
                                        </p>

                                        <p>
                                            <b>Time Window:</b>{" "}
                                            {fmtTime(selected.pickupReadyTime)} to{" "}
                                            {fmtTime(selected.pickupCloseTime)}
                                        </p>

                                        <p className="text-blue-700 font-medium mt-3">
                                            Your Loomis pickup has been scheduled.
                                        </p>
                                    </div>
                                )}

                                {selected.pickupStatus === "PICKED_UP" && (
                                    <div className="space-y-2">
                                        <p className="text-green-700 font-semibold">
                                            Your frames have been picked up by Loomis.
                                        </p>

                                        {selected.pickedUpOn && (
                                            <p>
                                                <b>Picked Up On:</b>{" "}
                                                {new Date(selected.pickedUpOn).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer (always visible) */}
                        <div className="flex items-center justify-end border-t px-6 py-4">
                            <button
                                onClick={() => setSelected(null)}
                                className="rounded border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDonations;