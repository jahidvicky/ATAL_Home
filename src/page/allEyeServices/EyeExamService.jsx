import React from "react";
import { motion } from "framer-motion";
import image from "../../assets/Services-images/EyeExam.jpg";
import { Link } from "react-router-dom";

const EyeExamService = () => {
    return (
        <div className="bg-white text-gray-900 py-16 px-6 md:px-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-content mb-8">
                    <Link to="/">
                        <button
                            className="px-6 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 active:scale-95 transition-transform"
                        >
                            Back
                        </button>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-red-700 ml-100">
                        Eye Exam
                    </h1>
                </div>



                {/* Intro */}
                <p className="text-lg text-gray-700 leading-relaxed mb-10 text-center">
                    A comprehensive eye exam is essential for maintaining clear vision and
                    healthy eyes. Our detailed examination goes beyond checking your
                    eyesight — it helps detect early signs of eye diseases and ensures
                    your overall visual wellness.
                </p>

                {/* Why Important */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-black mb-4 border-l-4 border-red-700 pl-3">
                        Why Regular Eye Exams Are Important
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Regular eye exams help identify changes in vision and detect
                        potential eye conditions before they progress. Many vision problems
                        develop gradually without obvious symptoms, which makes routine
                        check-ups essential. Early detection can prevent long-term damage
                        and ensure your vision remains sharp and comfortable.
                    </p>
                </section>

                {/* What to Expect Section */}
                <div className="leading-relaxed space-y-6 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <section className="mb-12 bg-red-50 p-6 rounded-2xl shadow-sm">
                        <h2 className="text-2xl font-semibold text-red-700 mb-4">
                            What to Expect During an Eye Exam
                        </h2>
                        <p className="text-gray-800 leading-relaxed">
                            Our eye exams include a series of painless and precise tests to
                            evaluate your vision and eye health. These include visual acuity
                            checks, refraction tests, eye pressure measurement, and retina
                            examination. Using advanced diagnostic tools, we ensure accurate
                            results and provide personalized recommendations for your vision
                            care needs.
                        </p>
                    </section>
                    <div>
                        <img
                            src={image}
                            alt="Eye Exam"
                            className="w-full h-58 rounded-xl object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>

                {/* Future Vision Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-black mb-4 border-l-4 border-red-700 pl-3">
                        Protect Your Vision for the Future
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Eye health is an essential part of your overall wellness. Regular
                        exams can help prevent eye strain, manage refractive errors, and
                        detect conditions such as glaucoma, cataracts, and diabetic
                        retinopathy. Taking time for your eyes today ensures clear, healthy
                        vision for tomorrow.
                    </p>
                </section>

                {/* Call to Action */}
                <section className="bg-black text-white p-8 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-4 text-red-500">
                        Schedule Your Eye Exam Today
                    </h2>
                    <p className="leading-relaxed">
                        Your eyes are your window to the world — keep them healthy and
                        protected. Book your comprehensive eye exam with our specialists
                        and experience professional care designed to maintain your vision
                        at its best. Because great eyesight starts with great care.
                    </p>
                    <Link to="/eye-schedule-test">
                        <button className="bg-white text-black mt-4 rounded-xl hover:bg-red-600 hover:text-white text-xl font-semibold py-4 px-6 hover:cursor-pointer transition-colors duration-300 ">
                            Book Eye Exam
                        </button>
                    </Link>
                </section>
            </motion.div>
        </div>
    );
};

export default EyeExamService;
