import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API, { IMAGE_URL } from "../../API/Api";
import { getMapEmbedUrl } from "../../utils/mapEmbed";

const LOCATION_TITLE = "North Location";

const resolveImgSrc = (img) => {
    if (!img) return null;
    return img.startsWith("http") ? img : `${IMAGE_URL}${img}`;
};

const NorthLocation = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await API.get("/location");
                const data = res.data.data || res.data;
                const match = data.find((loc) => loc.title === LOCATION_TITLE);
                if (match) {
                    setLocation({
                        title: match.title,
                        address: match.address,
                        map: getMapEmbedUrl(match.mapQuery),
                        image: resolveImgSrc(match.image),
                    });
                }
            } catch (err) {
                console.error("Failed to load location", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocation();
    }, []);

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full bg-[#f00000] py-24"
            >
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        North Location
                    </h1>
                </div>
            </motion.section>

            {/* Main Content */}
            <section className="w-full bg-white py-14 mb-15 mt-5">
                <div className="max-w-7xl mx-auto px-4">
                    {loading && (
                        <p className="text-center text-gray-500">Loading location...</p>
                    )}

                    {!loading && !location && (
                        <p className="text-center text-gray-500">
                            Location details are not available right now.
                        </p>
                    )}

                    {location && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            {/* Left: Map */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {location.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    {location.address}
                                </p>

                                <div className=" h-[330px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                    <iframe
                                        src={location.map}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Office Location Map"
                                    />
                                </div>
                            </motion.div>

                            {/* Right: Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={location.image}
                                    alt="Office Location"
                                    className="ml-10 h-[330px] object-cover rounded-lg shadow-md mt-17 transform transition-transform duration-500 ease-in-out hover:scale-110"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default NorthLocation;