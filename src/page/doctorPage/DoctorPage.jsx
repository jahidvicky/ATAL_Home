import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";

function DoctorPage() {
    const [doctors, setDoctors] = useState([]);

    const fetchDoctor = async () => {
        try {
            const res = await API.get("/getDoctor");
            console.log(res);

            setDoctors(res.data.data || []);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, []);

    return (
        <div>
            {/* Optometrists */}
            <section className="max-w-6xl mx-auto p-6 mb-10">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Meet Our Optometrists
                </h2>

                {doctors.length === 0 ? (
                    <p className="text-center text-gray-500">No doctors available right now.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doc, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-6 shadow-lg hover:shadow-red-400 border border-red-200 transition hover:scale-[1.02] cursor-pointer text-center"
                            >
                                <img
                                    src={
                                        doc.image?.startsWith("http")
                                            ? doc.image
                                            : `${IMAGE_URL}${doc.image}`
                                    }
                                    alt={doc.name}
                                    className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-2 border-red-300"
                                />

                                <h3 className="font-bold text-lg">{doc.doctor_name}</h3>

                                <p className="text-sm text-gray-600">
                                    {doc.specialization || "Optometrist"}
                                </p>

                                {doc.description && (
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                        {doc.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default DoctorPage;
