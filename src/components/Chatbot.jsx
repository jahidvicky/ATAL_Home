import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { CHAT_API_URL } from "../API/Api";
import socket from "../API/socket"; // ✅ Updated socket import

export default function SupportChat({ onClose }) {
    const [step, setStep] = useState("welcome");
    const [form, setForm] = useState({ name: "", email: "", reason: "" });
    const [chatId, setChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [rating, setRating] = useState(0);

    const chatEndRef = useRef(null);
    const scrollToBottom = () =>
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    useEffect(() => scrollToBottom(), [messages]);

    useEffect(() => {
        socket.on("newMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("typing", () => {
            setTyping(true);
            setTimeout(() => setTyping(false), 1500);
        });

        return () => {
            socket.off("newMessage");
            socket.off("typing");
        };
    }, []);

    const handleNext = async () => {
        if (step === "welcome") return setStep("name");
        if (step === "name" && form.name.trim()) return setStep("email");
        if (step === "email" && form.email.trim()) return setStep("reason");

        if (step === "reason" && form.reason.trim()) {
            const res = await fetch(`${CHAT_API_URL}/support/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            setChatId(data.chatId);
            setMessages(data.chat.messages || []);
            socket.emit("user:join", { chatId: data.chatId });
            return setStep("chat");
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim() || step === "closed") return;
        if (!chatId) return;

        socket.emit("sendMessage", { chatId, text: input });
        setInput("");
    };

    const handleCloseChat = async () => {
        if (!chatId) return;
        await fetch(`${CHAT_API_URL}/support/${chatId}/close`, { method: "PATCH" });
        setStep("closed");
    };

    const submitRating = async () => {
        if (!chatId || rating === 0) return;

        await fetch(`${CHAT_API_URL}/support/${chatId}/rating`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating }),
        });

        Swal.fire({
            icon: "success",
            title: "Thank you!",
            text: "Feedback submitted.",
            timer: 2000,
            showConfirmButton: false,
        });

        onClose();
    };

    return (
        <div className="fixed bottom-20 right-5 w-80 md:w-96 shadow-2xl rounded-2xl border bg-[#ffffff] flex flex-col h-[520px] z-50 animate-slide-up">

            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md">
                <span className="font-semibold">ATAL Support</span>
                <button onClick={onClose} className="text-white text-xl">✕</button>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm bg-gray-50">

                {step !== "chat" && step !== "closed" && (
                    <div className="bg-white p-4 rounded-xl shadow text-gray-700 text-center">
                        {step === "welcome" && "Hello! Need help today?"}
                        {step === "name" && "What's your name?"}
                        {step === "email" && "Your email address?"}
                        {step === "reason" && "How can we help you?"}
                    </div>
                )}

                {step === "chat" && (
                    <>
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`px-3 py-2 rounded-2xl max-w-[70%] shadow ${msg.sender === "user"
                                        ? "bg-red-600 text-white"
                                        : msg.sender === "admin"
                                            ? "bg-blue-100 text-gray-900"
                                            : "bg-gray-200 text-gray-900"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {typing && (
                            <div className="text-xs text-gray-500">Assistant is typing…</div>
                        )}
                    </>
                )}

                {step === "closed" && (
                    <div className="text-center text-gray-700 mt-10">
                        <p className="font-semibold mb-3">Chat closed! Thank you</p>
                        <p className="mb-2">Rate your experience</p>

                        <div className="flex justify-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-2xl cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-400"
                                        }`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={submitRating}
                            disabled={rating === 0}
                            className="bg-red-600 text-white rounded-lg px-4 py-2 disabled:bg-gray-400"
                        >
                            Submit Rating
                        </button>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Footer */}
            {step !== "closed" && (
                <div className="p-3 border-t bg-white rounded-b-2xl">
                    {step !== "chat" ? (
                        <div className="flex gap-2">
                            <input
                                className="flex-1 border rounded-xl px-3 py-2 text-sm bg-gray-100"
                                value={
                                    step === "name"
                                        ? form.name
                                        : step === "email"
                                            ? form.email
                                            : form.reason
                                }
                                onChange={(e) =>
                                    setForm({ ...form, [step]: e.target.value })
                                }
                                placeholder={
                                    step === "name"
                                        ? "Your name"
                                        : step === "email"
                                            ? "Your email"
                                            : "Describe your issue..."
                                }
                            />
                            <button
                                onClick={handleNext}
                                className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm shadow"
                            >
                                {step === "welcome" ? "Start" : "Next"}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                className="flex-1 border rounded-xl px-3 py-2 text-sm bg-white shadow-sm"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type message..."
                            />
                            <button className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700">
                                ➤
                            </button>
                            <button
                                type="button"
                                onClick={handleCloseChat}
                                className="bg-gray-500 text-white px-3 py-2 rounded-lg text-xs"
                            >
                                Close
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
