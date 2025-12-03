import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTruck, FaPauseCircle, FaCalendarAlt, FaCogs } from "react-icons/fa";
import { GiMicroscopeLens } from "react-icons/gi";
import OurPromise from "../Cart/OurPromise";
import Contact_Lens from "../../assets/megaMenu/contactLens.avif"

const steps = [
    {
        icon: <GiMicroscopeLens className="w-7 h-7" aria-hidden />,
        title: "Find your contact lens",
        text: "Pick your prescribed lenses and select the subscription option.",
    },
    {
        icon: <FaCogs className="w-7 h-7" aria-hidden />,
        title: "Customize your plan",
        text: "Choose monthly, 3-month, or 6-month deliveries and boxes.",
    },
    {
        icon: <FaTruck className="w-7 h-7" aria-hidden />,
        title: "Checkout",
        text: "We ship automatic refills on your schedule—free shipping.",
    },
];

const benefits = [
    {
        icon: <FaTruck className="w-6 h-6" aria-hidden />,
        title: "Free delivery always",
        text: "No extra fees. Shipping's on us for every refill.",
    },
    {
        icon: <FaCalendarAlt className="w-6 h-6" aria-hidden />,
        title: "Automatic delivery",
        text: "Set it once—your lenses arrive right when you need them.",
    },
    {
        icon: <FaPauseCircle className="w-6 h-6" aria-hidden />,
        title: "Pause or cancel anytime",
        text: "Total control from your account. No commitments.",
    },
];

const fade = {
    hidden: { opacity: 0, y: 12 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.45, ease: "easeOut" } }),
};

export default function SubscribeSave() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700/80 to-black" />
                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-16">
                    <motion.div
                        className="max-w-2xl"
                        initial={fade.hidden}
                        animate={fade.show(0)}
                    >
                        <p className="inline-block rounded-full bg-black text-white px-4 py-3 text-sm tracking-wider uppercase">Subscribe & Save</p>
                        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                            Save <span className="text-red-200">20%</span> + Free Shipping
                        </h1>
                        <p className="mt-4 text-white">
                            Start a contact lenses subscription—never run out again. Customize your delivery schedule and enjoy hassle-free refills.
                        </p>

                        <div className="mt-6 flex items-center gap-3 text-white">
                            <FaCheckCircle className="w-4 h-4" />
                            Auto-refills. Change anytime.
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-10 w-full rounded-3xl p-3 lg:mt-0 lg:max-w-md"
                        initial={fade.hidden}
                        animate={fade.show(1)}
                    >
                        <img
                            src={Contact_Lens}
                            alt="Contact lenses and solution"
                            className="w-full rounded-2xl object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* How to order */}
            <section id="how" className="mx-auto max-w-7xl px-6 py-16">
                <motion.h2
                    className="text-center text-2xl font-bold tracking-tight"
                    initial={fade.hidden}
                    whileInView={fade.show(0)}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    How to order
                </motion.h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.title}
                            custom={i}
                            initial={fade.hidden}
                            whileInView={fade.show(i)}
                            viewport={{ once: true, amount: 0.3 }}
                            className="group rounded-3xl border border-red-300 bg-gray-100 shadow-lg hover:shadow-red-400 p-6"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f00000] text-white">
                                {s.icon}
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-black">{s.title}</h3>
                            <p className="mt-2 text-sm text-gray-700">{s.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Choose your subscription (plans) */}
            <section id="plans" className="relative isolate">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black to-neutral-950" />
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <motion.div
                        initial={fade.hidden}
                        whileInView={fade.show(0)}
                        viewport={{ once: true, amount: 0.3 }}
                        className="grid items-center gap-10 lg:grid-cols-2"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-white">You choose your subscription</h2>
                            <p className="mt-3 text-neutral-300">
                                Decide how often your order ships automatically:
                            </p>
                            <ul className="mt-4 space-y-2 text-neutral-200">
                                <li className="flex items-start gap-2"><FaCheckCircle className="mt-0.5 h-5 w-5 text-[#f00000]" /> Every month</li>
                                <li className="flex items-start gap-2"><FaCheckCircle className="mt-0.5 h-5 w-5 text-[#f00000]" /> Every three months</li>
                                <li className="flex items-start gap-2"><FaCheckCircle className="mt-0.5 h-5 w-5 text-[#f00000]" /> Every six months</li>
                            </ul>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                { name: "Monthly", save: "20% off", note: "Best for dailies" },
                                { name: "Every 3 months", save: "20% off", note: "Popular" },
                                { name: "Every 6 months", save: "20% off", note: "Set & forget" },
                            ].map((p, i) => (
                                <motion.div
                                    key={p.name}
                                    custom={i}
                                    initial={fade.hidden}
                                    whileInView={fade.show(i)}
                                    viewport={{ once: true, amount: 0.2 }}
                                    className="rounded-3xl border border-white/10 bg-neutral-900 p-5 text-center ring-1 ring-white/5 hover:bg-neutral-800"
                                >
                                    <div className="text-sm uppercase tracking-wider text-neutral-400">{p.name}</div>
                                    <div className="mt-2 text-3xl font-extrabold text-[#f00000]">{p.save}</div>
                                    <div className="mt-2 text-xs text-neutral-300">{p.note}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-6 md:grid-cols-3">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={b.title}
                            custom={i}
                            initial={fade.hidden}
                            whileInView={fade.show(i)}
                            viewport={{ once: true, amount: 0.3 }}
                            className="rounded-3xl border border-red-300 shadow-lg hover:shadow-red-400 bg-gray-100 p-6"
                        >
                            <div className="flex items-center gap-3 text-[#f00000]">{b.icon}<span className="font-semibold">{b.title}</span></div>
                            <p className="mt-2 text-sm text-black">{b.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section id="cta" className="px-6 pb-20">
                <div className="rounded-3xl bg-[#f00000] p-8 text-center">
                    <h3 className="text-2xl text-white font-extrabold">Ready to subscribe & save?</h3>
                    <p className="mt-2 text-white">Pick your lenses, select subscription at checkout, and enjoy automatic refills.</p>
                </div>
            </section>
            <OurPromise />
        </div>
    );
}
