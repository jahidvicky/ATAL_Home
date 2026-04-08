import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../API/Api";
import Swal from "sweetalert2";

/* ─────────────────────────────────────────────────────────────
   Helper: parse return tracking number from an event message
   e.g. "...Customer tracking: RET673581001. Loomis..."
───────────────────────────────────────────────────────────── */
const parseReturnTrackingFromMessage = (message = "") => {
    const match = message.match(/[Cc]ustomer tracking[:\s]+([A-Z0-9]+)/);
    return match ? match[1] : null;
};

/* ─────────────────────────────────────────────────────────────
   Helper: build a synthetic returnRequest + returnInfo from
   events when the API returns returnRequest: null but
   orderStatus === "Returned".
───────────────────────────────────────────────────────────── */
const buildReturnFromEvents = (events = []) => {
    const returnedEvent = events.find(
        (e) => e.status?.toLowerCase() === "returned"
    );
    if (!returnedEvent) return { returnRequest: null, returnInfo: null };

    const returnTracking = parseReturnTrackingFromMessage(returnedEvent.message || "");

    return {
        returnRequest: {
            status: "Completed",
            requestedAt: returnedEvent.updatedAt,
            reason: null,
            rejectionReason: null,
        },
        returnInfo: returnTracking
            ? { trackingNumber: returnTracking, rmaNumber: null }
            : null,
    };
};

const TrackOrder = () => {
    const navigate = useNavigate();
    const { trackingNumber: paramTracking } = useParams();

    const [trackingNumber, setTrackingNumber] = useState(paramTracking || "");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("delivery");

    /* ── Delivery Steps ── */
    const deliverySteps =
        order?.orderStatus?.toLowerCase() === "cancelled"
            ? ["Placed", "Processing", "Cancelled"]
            : ["Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

    /* ── Return Steps ── */
    const returnSteps = [
        "Return Requested",
        "Return Approved",
        "Pickup Scheduled",
        "Return Completed",
    ];

    const deliveryIndexMap = {
        placed: 0,
        processing: 1,
        shipped: 2,
        "out for delivery": 3,
        delivered: 4,
        returned: 4,
        cancelled: 2,
    };

    const returnIndexMap = {
        pending: 0,
        approved: 1,
        "pickup scheduled": 2,
        completed: 3,
        rejected: -1,
    };

    const currentDeliveryStep = order
        ? (deliveryIndexMap[(order.orderStatus || "").toLowerCase()] ?? -1)
        : -1;

    const returnStatus = order?.returnRequest?.status?.toLowerCase() || "";
    const currentReturnStep = returnStatus ? (returnIndexMap[returnStatus] ?? -1) : -1;
    const isReturnRejected = returnStatus === "rejected";
    const hasReturn = !!order?.returnRequest?.status;

    /* ── Fetch ── */
    const handleTrack = async () => {
        if (!trackingNumber.trim()) {
            Swal.fire("Error", "Please enter a tracking number", "error");
            return;
        }
        setLoading(true);
        try {
            const { data } = await API.get(`/order/track/${trackingNumber}`);
            if (!data?.success) throw new Error("Tracking failed");

            const filtered = (data.trackingHistory || []).filter((entry) => {
                if (["Pickup Scheduled", "Shipment Voided"].includes(entry.status)) return false;
                if (
                    entry.status === "Cancelled" &&
                    typeof entry.message === "string" &&
                    entry.message.toLowerCase().includes("voided")
                )
                    return false;
                return true;
            });

            const sorted = [...filtered].sort(
                (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
            );

            const statusMap = new Map();
            sorted.forEach((t) => statusMap.set(t.status, t));
            const deduped = [...statusMap.values()].sort(
                (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
            );

            // If API gives returnRequest use it; otherwise fall back to event parsing
            let returnRequest = data.returnRequest || null;
            let returnInfo = data.returnInfo || null;

            if (!returnRequest && (data.orderStatus || "").toLowerCase() === "returned") {
                const built = buildReturnFromEvents(deduped);
                returnRequest = built.returnRequest;
                returnInfo = built.returnInfo;
            }

            setOrder({
                orderStatus: data.orderStatus || "Processing",
                trackingNumber: data.trackingNumber || null,
                deliveryDate: data.deliveryDate || null,
                events: deduped,
                returnRequest,
                returnInfo,
            });

            // Auto-switch to return tab if return data exists
            setActiveTab(returnRequest?.status ? "return" : "delivery");
        } catch (err) {
            Swal.fire("Not Found", "No order found with this tracking number", "error");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (paramTracking) {
            setTrackingNumber(paramTracking);
            setTimeout(() => handleTrack(), 0);
        }
    }, [paramTracking]);

    /* ── Status badge colors ── */
    const orderStatusBadge = {
        Delivered: "bg-green-100 text-green-700 border border-green-200",
        Shipped: "bg-blue-100 text-blue-700 border border-blue-200",
        Processing: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        Cancelled: "bg-red-100 text-red-700 border border-red-200",
        "Out for Delivery": "bg-indigo-100 text-indigo-700 border border-indigo-200",
        Returned: "bg-purple-100 text-purple-700 border border-purple-200",
        Placed: "bg-gray-100 text-gray-600 border border-gray-200",
    };

    const returnStatusBadge = {
        Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        Approved: "bg-green-100 text-green-700 border border-green-200",
        Rejected: "bg-red-100 text-red-700 border border-red-200",
        Completed: "bg-blue-100 text-blue-700 border border-blue-200",
        "Pickup Scheduled": "bg-indigo-100 text-indigo-700 border border-indigo-200",
    };

    /* ─────────────────────────────────────────
       STEP BAR COMPONENT
    ───────────────────────────────────────── */
    const StepBar = ({
        steps,
        currentStep,
        dotActive = "bg-[#dc2626]",
        dotDone = "bg-[#dc2626]",
        lineActive = "bg-[#dc2626]",
        ringColor = "ring-red-200",
    }) => (
        <div className="flex items-center w-full">
            {steps.map((step, index) => {
                const isDone = currentStep > index;
                const isActive = currentStep === index;
                const isPending = currentStep < index;

                return (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                                    w-8 h-8 flex items-center justify-center rounded-full
                                    text-xs font-semibold transition-all duration-300
                                    ${isDone
                                        ? `${dotDone} text-white`
                                        : isActive
                                            ? `${dotActive} text-white ring-4 ${ringColor}`
                                            : "bg-white border-2 border-gray-200 text-gray-400"
                                    }
                                `}
                            >
                                {isDone || isActive ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span
                                className={`text-[11px] mt-1.5 text-center leading-tight ${isPending ? "text-gray-400" : "text-gray-800 font-medium"
                                    }`}
                                style={{ maxWidth: 72 }}
                            >
                                {step}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-[2.5px] mb-5 mx-1 rounded-full transition-all duration-500 ${currentStep > index ? lineActive : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );

    /* ── Rejected-only step bar ── */
    const RejectedStepBar = () => (
        <div className="flex items-center w-full">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#dc2626] text-white text-xs font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="text-[11px] mt-1.5 text-center leading-tight text-gray-800 font-medium" style={{ maxWidth: 72 }}>
                    Return Requested
                </span>
            </div>
            <div className="flex-1 h-[2.5px] mb-5 mx-1 rounded-full bg-red-300" />
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold ring-4 ring-red-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <span className="text-[11px] mt-1.5 text-center leading-tight text-red-600 font-medium" style={{ maxWidth: 72 }}>
                    Rejected
                </span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6 pt-10">
            <div className="w-full max-w-3xl space-y-4">

                {/* ══ HEADER ══ */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Track Your Order</h2>
                            <p className="text-xs text-gray-400">Enter your tracking number below</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* ══ SEARCH BAR ══ */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter Tracking Number (e.g. LSHA00396482)"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                                className="w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg uppercase text-sm tracking-wide focus:ring-2 focus:ring-red-300 focus:border-red-400 outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={handleTrack}
                            disabled={loading}
                            className={`px-5 py-2.5 rounded-lg text-white font-semibold text-sm transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#dc2626] hover:bg-red-700 active:scale-95"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Checking…
                                </span>
                            ) : "Track"}
                        </button>
                    </div>
                </div>

                {/* ══ EMPTY STATE ══ */}
                {!loading && !order && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-12 flex flex-col items-center gap-3 text-center">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm">Enter your tracking number above to check your order progress.</p>
                    </div>
                )}

                {order && (
                    <>
                        {/* ══ ORDER META STRIP ══ */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
                            <div className="flex flex-wrap gap-6 items-center">
                                {order.trackingNumber && (
                                    <div>
                                        <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">Tracking No.</p>
                                        <p className="text-sm font-bold text-blue-600">{order.trackingNumber}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">Order Status</p>
                                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${orderStatusBadge[order.orderStatus] || "bg-gray-100 text-gray-600 border border-gray-200"
                                        }`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                                {order.deliveryDate && (
                                    <div>
                                        <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">Delivered On</p>
                                        <p className="text-sm font-bold text-gray-800">
                                            {new Date(order.deliveryDate).toLocaleString([], {
                                                year: "numeric", month: "short", day: "2-digit",
                                                hour: "2-digit", minute: "2-digit", hour12: true,
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ══ TABS ══ */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="flex border-b border-gray-100">

                                {/* Delivery Tab */}
                                <button
                                    onClick={() => setActiveTab("delivery")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${activeTab === "delivery"
                                        ? "text-[#dc2626] border-b-2 border-[#dc2626] bg-red-50"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                    Delivery Tracking
                                </button>

                                {/* Return Tab */}
                                <button
                                    onClick={() => hasReturn && setActiveTab("return")}
                                    disabled={!hasReturn}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${!hasReturn
                                        ? "text-gray-300 cursor-not-allowed"
                                        : activeTab === "return"
                                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                    </svg>
                                    Return Tracking
                                    {!hasReturn && (
                                        <span className="text-[10px] text-gray-300 font-normal ml-1">(N/A)</span>
                                    )}
                                </button>
                            </div>

                            {/* ─── DELIVERY PANEL ─── */}
                            {activeTab === "delivery" && (
                                <div className="px-6 py-5 space-y-6">
                                    <div>
                                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-5">
                                            Order Progress
                                        </p>
                                        <StepBar
                                            steps={deliverySteps}
                                            currentStep={currentDeliveryStep}
                                            dotActive="bg-[#dc2626]"
                                            dotDone="bg-[#dc2626]"
                                            lineActive="bg-[#dc2626]"
                                            ringColor="ring-red-200"
                                        />
                                    </div>

                                    {order.events?.length > 0 && (
                                        <div>
                                            <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-100 mb-4">
                                                Tracking History
                                            </h3>
                                            <div className="max-h-72 overflow-y-auto pr-1">
                                                <div className="relative pl-5">
                                                    <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200 rounded-full" />
                                                    {[...(order.events || [])].reverse().map((event, idx) => {
                                                        const isLatest = idx === 0;
                                                        return (
                                                            <div key={event._id || idx} className="mb-5 relative">
                                                                <div className={`absolute -left-[13px] top-1 w-3 h-3 rounded-full border-2 border-white ${isLatest ? "bg-[#dc2626]" : "bg-gray-300"}`} />
                                                                <div className="ml-2">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <p className={`text-sm font-semibold ${isLatest ? "text-gray-900" : "text-gray-600"}`}>
                                                                            {event.status}
                                                                        </p>
                                                                        <span className="text-xs text-gray-400">
                                                                            {new Date(event.updatedAt).toLocaleDateString("en-IN", {
                                                                                weekday: "short", day: "2-digit", month: "short", year: "2-digit",
                                                                            })}
                                                                            {" · "}
                                                                            {new Date(event.updatedAt).toLocaleTimeString("en-IN", {
                                                                                hour: "2-digit", minute: "2-digit",
                                                                            })}
                                                                        </span>
                                                                    </div>
                                                                    {event.message && (
                                                                        <p className="text-xs text-gray-500 mt-0.5">{event.message}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ─── RETURN PANEL ─── */}
                            {activeTab === "return" && hasReturn && (
                                <div className="px-6 py-5 space-y-5">

                                    {/* Header row */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                            Return Progress
                                        </p>
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${returnStatusBadge[order.returnRequest.status] || "bg-gray-100 text-gray-600"
                                            }`}>
                                            {order.returnRequest.status}
                                        </span>
                                    </div>

                                    {/* Step bar */}
                                    {isReturnRejected ? (
                                        <RejectedStepBar />
                                    ) : (
                                        <StepBar
                                            steps={returnSteps}
                                            currentStep={currentReturnStep}
                                            dotActive="bg-blue-600"
                                            dotDone="bg-blue-600"
                                            lineActive="bg-blue-500"
                                            ringColor="ring-blue-200"
                                        />
                                    )}

                                    {/* Rejected banner */}
                                    {isReturnRejected && (
                                        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
                                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-red-700">Return Request Rejected</p>
                                                {order.returnRequest.rejectionReason && (
                                                    <p className="text-xs text-red-500 mt-0.5">{order.returnRequest.rejectionReason}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Return details — only show if values exist */}
                                    {(order.returnRequest.reason || order.returnRequest.requestedAt) && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                                            {order.returnRequest.reason && (
                                                <div>
                                                    <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">Reason</p>
                                                    <p className="text-sm font-medium text-gray-800">{order.returnRequest.reason}</p>
                                                </div>
                                            )}
                                            {order.returnRequest.requestedAt && (
                                                <div>
                                                    <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">Requested On</p>
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {new Date(order.returnRequest.requestedAt).toLocaleDateString("en-IN", {
                                                            day: "2-digit", month: "short", year: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* E-Return info box — show for Approved or Completed when tracking exists */}
                                    {["Approved", "Completed"].includes(order.returnRequest.status) &&
                                        order.returnInfo?.trackingNumber && (
                                            <div className="p-4 bg-green-50 rounded-lg border border-green-200 space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-bold text-green-700">E-Return Created</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">Return Tracking</p>
                                                        <p className="text-sm font-semibold text-blue-600">
                                                            {order.returnInfo.trackingNumber}
                                                        </p>
                                                    </div>
                                                    {order.returnInfo.rmaNumber && (
                                                        <div>
                                                            <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">RMA Number</p>
                                                            <p className="text-sm font-semibold text-gray-800">
                                                                {order.returnInfo.rmaNumber}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;