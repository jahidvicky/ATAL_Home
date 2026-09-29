import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API/Api"

const PickupStatus = () => {
    const { token } = useParams();

    const [pickup, setPickup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadPickupStatus = async () => {
        try {
            setLoading(true);

            const response = await API.get(
                `/donate-frame/pickup/${token}`
            );

            setPickup(response.data.pickup);
            setError("");

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to load pickup information"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPickupStatus();
    }, [token]);

    if (loading) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                Loading pickup information...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h2>Pickup Information</h2>

                <p style={{ color: "red" }}>
                    {error}
                </p>
            </div>
        );
    }

    const status = pickup?.status;

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f5f5f5",
                padding: "50px 20px",
            }}
        >
            <div
                style={{
                    maxWidth: "650px",
                    margin: "auto",
                    background: "#fff",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
                }}
            >
                <h1
                    style={{
                        color: "#c60001",
                        marginBottom: "10px",
                    }}
                >
                    ATAL Optical
                </h1>

                <h2>
                    Frame Pickup Status
                </h2>

                <div
                    style={{
                        margin: "25px 0",
                        padding: "15px",
                        background: "#f7f7f7",
                        borderRadius: "8px",
                    }}
                >
                    <strong>Status:</strong>

                    <div
                        style={{
                            marginTop: "8px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color:
                                status === "PICKED_UP"
                                    ? "green"
                                    : status === "ARRANGED"
                                        ? "#0066ff"
                                        : "#777",
                        }}
                    >
                        {status === "ARRANGED"
                            ? "Pickup Scheduled"
                            : status === "PICKED_UP"
                                ? "Picked Up"
                                : status}
                    </div>
                </div>

                <div>
                    <p>
                        <strong>Donor:</strong>{" "}
                        {pickup.name}
                    </p>

                    <p>
                        <strong>Frame Type:</strong>{" "}
                        {pickup.frameType}
                    </p>

                    <p>
                        <strong>Quantity:</strong>{" "}
                        {pickup.frameQuantity}
                    </p>
                </div>

                {pickup.pickupDate && (
                    <>
                        <hr />

                        <h3>
                            Pickup Details
                        </h3>

                        <p>
                            <strong>Date:</strong>{" "}
                            {pickup.pickupDate}
                        </p>

                        <p>
                            <strong>Ready From:</strong>{" "}
                            {pickup.readyTime}
                        </p>

                        <p>
                            <strong>Pickup Until:</strong>{" "}
                            {pickup.closeTime}
                        </p>
                    </>
                )}

                {pickup.confirmationId && (
                    <p>
                        <strong>
                            Loomis Confirmation ID:
                        </strong>{" "}
                        {pickup.confirmationId}
                    </p>
                )}

                {status === "PICKED_UP" &&
                    pickup.pickedUpOn && (
                        <div
                            style={{
                                marginTop: "20px",
                                padding: "15px",
                                background: "#e8f7e8",
                                borderRadius: "8px",
                            }}
                        >
                            <strong>
                                Your frames have been picked up.
                            </strong>

                            <p>
                                Picked up on:{" "}
                                {new Date(
                                    pickup.pickedUpOn
                                ).toLocaleString()}
                            </p>
                        </div>
                    )}

                {status === "ARRANGED" && (
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "15px",
                            background: "#eef5ff",
                            borderRadius: "8px",
                        }}
                    >
                        The Loomis pickup has been scheduled.
                        Please keep your frames ready during
                        the pickup window.
                    </div>
                )}

                <button
                    onClick={loadPickupStatus}
                    style={{
                        marginTop: "25px",
                        width: "100%",
                        padding: "12px",
                        background: "#c60001",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Refresh Pickup Status
                </button>
            </div>
        </div>
    );
};

export default PickupStatus;