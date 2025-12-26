// FilterSections Component
const FilterSections = ({ filters, setFilters, facetData }) => {

    /* ---------- HELPERS ---------- */
    const toggleSet = (set, value) => {
        const next = new Set(set);
        next.has(value) ? next.delete(value) : next.add(value);
        return next;
    };

    const Section = ({ title, children }) => (
        <div className="py-3 border-b last:border-b-0">
            <h4 className="font-medium text-sm mb-2">{title}</h4>
            {children}
        </div>
    );

    const Check = ({ label, setKey, value }) => {
        const checked = filters[setKey].has(value);

        return (
            <label className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={checked}
                    onChange={() =>
                        setFilters(prev => ({
                            ...prev,
                            [setKey]: toggleSet(prev[setKey], value),
                        }))
                    }
                />
                <span className="text-sm capitalize">{label}</span>
            </label>
        );
    };

    return (
        <div>

            {/* ---------- BRAND ---------- */}
            {facetData.brands?.length > 0 && (
                <Section title="Brand">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.brands.map(b => (
                            <Check key={b} label={b} setKey="brands" value={b} />
                        ))}
                    </div>
                </Section>
            )}

            {/* ---------- GENDER ---------- */}
            <Section title="Gender">
                <div className="flex flex-col gap-1">

                    {/* KIDS */}
                    <label className="flex items-center gap-2 py-1 cursor-pointer">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={filters.isKids}
                            onChange={() =>
                                setFilters(prev => ({
                                    ...prev,
                                    isKids: !prev.isKids,
                                }))
                            }
                        />
                        <span className="text-sm">Kids</span>
                    </label>

                    {/* MEN / WOMEN */}
                    {facetData.genders
                        ?.filter(g => g !== "Kids")
                        .map(g => (
                            <Check
                                key={g}
                                label={g}
                                setKey="genders"
                                value={g}
                            />
                        ))}
                </div>
            </Section>

            {/* Shape Filter */}
            {facetData.faceShapes?.length > 0 && (
                <Section title="Face Shape">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.faceShapes.map(s => (
                            <Check
                                key={s}
                                label={s}
                                setKey="faceShapes"
                                value={s}
                            />
                        ))}
                    </div>
                </Section>
            )}

            {facetData.frameShapes?.length > 0 && (
                <Section title="Frame Shape">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.frameShapes.map(s => (
                            <Check
                                key={s}
                                label={s}
                                setKey="frameShapes"
                                value={s}
                            />
                        ))}
                    </div>
                </Section>
            )}

            {/* ---------- PRICE RANGE (SINGLE SLIDER) ---------- */}
            <Section title="Price">
                <div className="flex flex-col gap-3">

                    {/* Selected Price */}
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>$0</span>
                        <span>${filters.priceMax}</span>
                    </div>

                    {/* Single Range Slider */}
                    <input
                        type="range"
                        min={0}
                        max={facetData.max}
                        value={filters.priceMax}
                        onChange={(e) =>
                            setFilters(prev => ({
                                ...prev,
                                priceMin: 0,
                                priceMax: Number(e.target.value),
                            }))
                        }
                        className="w-full accent-black"
                    />

                    {/* Range Hint */}
                    <div className="text-xs text-gray-400 text-center">
                        Up to ${filters.priceMax}
                    </div>

                </div>
            </Section>

            {/* ---------- COLOR ---------- */}
            {facetData.colors?.length > 0 && (
                <Section title="Color">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.colors.map(c => (
                            <Check key={c} label={c} setKey="colors" value={c} />
                        ))}
                    </div>
                </Section>
            )}

            {/* ---------- MATERIAL ---------- */}
            {facetData.materials?.length > 0 && (
                <Section title="Material">
                    <div className="max-h-40 overflow-auto pr-1">
                        {facetData.materials.map(m => (
                            <Check key={m} label={m} setKey="materials" value={m} />
                        ))}
                    </div>
                </Section>
            )}

        </div>
    );
};

export default FilterSections;
