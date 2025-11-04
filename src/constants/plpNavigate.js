// src/routes/plpNavigate.js
export const goToPLP = (navigate, subCategory, catId, subCatId) => {
    navigate(
        `/allproduct/${encodeURIComponent(subCategory)}/${catId}/${subCatId}`,
        { replace: true }
    );
};
