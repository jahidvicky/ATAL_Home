import React from 'react'

const StockAvailability = ({ data }) => {
    return (
        <div>
            {data > 0 ? (
                <span className="text-green-600 font-semibold">In stock</span>
            ) : (
                <span className="text-[#f00000] font-semibold">Out of Stock</span>
            )}
        </div>
    )
}

export default StockAvailability
