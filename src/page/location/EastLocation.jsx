import { motion } from "framer-motion";
import eastLocation from "../../assets/loaction/eastLocation.jpg";

const EastLocation = () => {
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
                        East Location
                    </h1>
                </div>
            </motion.section>

            {/* Main Content */}
            <section className="w-full bg-white py-14 mb-15 mt-5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Left: Map */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                East location
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                5 Cherrycrest Drive, Brampton, ON L6P 3W4, Canada
                            </p>

                            <div className=" h-[330px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                <iframe
                                    src="https://www.google.com/maps?q=5+Cherrycrest+Drive,+Brampton,+ON+L6P+3W4,+Canada&output=embed"
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
                                src={eastLocation}
                                alt="Office Location"
                                className="ml-10 h-[330px] object-cover rounded-lg shadow-md mt-17 transform transition-transform duration-500 ease-in-out hover:scale-110"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EastLocation;
