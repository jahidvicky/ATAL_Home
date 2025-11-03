import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MegaMenu = ({ label, columns = [], promo }) => {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef(null);
    const rootRef = useRef(null);
    const location = useLocation();
    const menuId = `mega-${label.replace(/\s+/g, "-").toLowerCase()}`;

    // Optional hover behavior (keep if you want hover + click)
    const onEnter = () => {
        clearTimeout(timeoutRef.current);
        setOpen(true);
    };
    const onLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 120);
    };

    // Click-to-toggle
    const onToggleClick = (e) => {
        e.stopPropagation();
        clearTimeout(timeoutRef.current);
        setOpen((v) => !v);
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler, { passive: true });
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, []);

    // Close on route change
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <li
            ref={rootRef}
            className="relative"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* Button trigger for click toggle + a11y */}
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls={menuId}
                className="cursor-pointer hover:text-red-600 outline-none"
                onClick={onToggleClick}
                onKeyDown={(e) => {
                    if (e.key === "Escape") setOpen(false);
                    if (e.key === "ArrowDown") setOpen(true);
                }}
            >
                {label}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id={menuId}
                        role="menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: "easeInOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-2xl z-50 ml-46 w-[890px] overflow-hidden pointer-events-auto"
                    >
                        <div className="grid grid-cols-4">
                            {/* Link columns */}
                            <div className="col-span-3 grid grid-cols-3 gap-6 p-5">
                                {columns.map((col) => (
                                    <div key={col.title}>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                            {col.title}
                                        </h4>
                                        <ul className="space-y-1">
                                            {col.links.map((l) => (
                                                <li key={`${col.title}-${l.label}`}>
                                                    <Link
                                                        to={l.to}
                                                        state={l.state}
                                                        role="menuitem"
                                                        className="block text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded px-2 py-1"
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {l.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Visual promo panel */}
                            <div className="col-span-1 border-l border-gray-100 bg-white">
                                <div className="p-5 h-full flex flex-col">
                                    <div className="relative rounded-xl overflow-hidden shadow-sm">
                                        {promo?.image && (
                                            <img
                                                src={promo.image}
                                                alt={promo?.headline || "Promo"}
                                                className="w-full h-44 object-cover"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        )}
                                        {promo?.badge && (
                                            <span className="absolute top-2 left-2 bg-black text-white text-xs tracking-wide px-2 py-1 rounded">
                                                {promo.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h5 className="mt-3 text-base font-semibold text-gray-900">
                                        {promo?.headline}
                                    </h5>
                                    <p className="text-sm text-gray-600 mt-1">{promo?.text}</p>
                                    {promo?.ctaLabel && (
                                        <Link
                                            to={promo.ctaTo || "#"}
                                            state={promo.state}
                                            className="inline-block mt-3 bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpen(false);
                                            }}
                                        >
                                            {promo.ctaLabel}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
};

export default MegaMenu;



