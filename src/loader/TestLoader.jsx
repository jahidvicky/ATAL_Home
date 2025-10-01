import React, { useState } from "react";
import Loader from "./Loader";

const TestLoader = () => {
    const [loading, setLoading] = useState(false);

    const handleShowLoader = () => {
        setLoading(true);

        setTimeout(() => setLoading(false), 7000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <button
                onClick={handleShowLoader}
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Show Loader
            </button>

            {loading && <Loader />}
        </div>
    );
};

export default TestLoader;
