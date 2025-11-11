// src/routes/plpNavigate.js
export const goToPLP = (navigate, subCategory, catId, subCatId) => {
    const slugify = (str) =>
        String(str)
            .toLowerCase()
            .replace(/['"]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .trim();

    const slug = slugify(subCategory);

    navigate(`/allproduct/${slug}/${catId}/${subCatId}`, { replace: true });
};
