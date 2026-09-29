import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import API from "../API/Api";

dayjs.extend(customParseFormat);

const STATUS = {
    PENDING: {
        label: "Pickup Pending",
        cls: "bg-yellow-100 text-yellow-700",
        message:
            "Your donation has been received. Our team will arrange the free Loomis pickup soon.",
    },
    ARRANGED: {
        label: "Pickup Scheduled",
        cls: "bg-blue-100 text-blue-700",
        message: "Your Loomis pickup has been scheduled.",
    },
    PICKED_UP: {
        label: "Picked Up",
        cls: "bg-green-100 text-green-700",
        message: "Your frames have been picked up by Loomis. Thank you for donating!",
    },
    CANCELLED: {
        label: "Cancelled",
        cls: "bg-gray-200 text-gray-700",
        message: "This pickup was cancelled. Please contact us if you'd like to reschedule.",
    },
};

const getStatusInfo = (status) => STATUS[status] || STATUS.PENDING;

const fmtDate = (d) =>
    d ? dayjs(d, "YYYYMMDD").format("dddd, MMM D, YYYY") : "N/A";

const fmtTime = (t) =>
    t && String(t).length === 4
        ? dayjs(String(t), "HHmm").format("h:mm A")
        : t || "N/A";

const PickupStatus = () => {
    const { token } = useParams();
    const [pickup, setPickup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStatus = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await API.get(`/donate-frame/pickup/${token}`);
            setPickup(res.data.pickup);
        } catch (err) {
            console.error("Pickup status fetch failed:", err);
            setError(
                err.response?.data?.message ||
                "We couldn't find this pickup. The link may be invalid or expired."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-gray-600">Loading your pickup status...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto px-5 py-16 text-center">
                <h1 className="text-2xl font-bold text-[#f00000] mb-3">
                    Pickup Not Found
                </h1>
                <p className="text-gray-600 mb-6">{error}</p>
                <a
                    href="mailto:info.ataloptical@gmail.com"
                    className="text-[#f00000] underline font-medium"
                >
                    Contact us for help
                </a>
            </div>
        );
    }

    const status = getStatusInfo(pickup.status);

    return (
        <div className="max-w-2xl mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold text-[#f00000] mb-1">
                Frame Pickup Status
            </h1>
            <p className="text-gray-600 mb-8">
                Hello {pickup.name}, here's the latest on your donation.
            </p>

            <div className="bg-white border rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold">
                        {pickup.frameType || "Frame Donation"}
                    </h2>
                    <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${status.cls}`}
                    >
                        {status.label}
                    </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-5 text-sm">
                    <div>
                        <p className="text-gray-500">Quantity donated</p>
                        <p className="font-semibold">
                            {pickup.frameQuantity ?? "Not recorded"}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Pickup address</p>
                        <p className="font-semibold">
                            {[pickup.address, pickup.city, pickup.province, pickup.postal]
                                .filter(Boolean)
                                .join(", ") || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5">
                    <p className="mb-3">{status.message}</p>

                    {pickup.status === "ARRANGED" && (
                        <div className="space-y-1 text-sm">
                            <p>
                                <b>Pickup Date:</b> {fmtDate(pickup.pickupDate)}
                            </p>
                            <p>
                                <b>Time Window:</b> {fmtTime(pickup.readyTime)} to{" "}
                                {fmtTime(pickup.closeTime)}
                            </p>
                            <p className="text-gray-600 mt-2">
                                Please have the frames packed and ready at your door during
                                this window.
                            </p>
                        </div>
                    )}

                    {pickup.status === "PICKED_UP" && pickup.pickedUpOn && (
                        <p className="text-sm">
                            <b>Picked Up On:</b>{" "}
                            {dayjs(pickup.pickedUpOn).format("MMM D, YYYY h:mm A")}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={fetchStatus}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                >
                    Refresh
                </button>
                <a
                    href="mailto:info.ataloptical@gmail.com"
                    className="text-sm text-[#f00000] underline"
                >
                    Need to change your pickup? Contact us
                </a>
            </div>
        </div>
    );
};

export default PickupStatus;