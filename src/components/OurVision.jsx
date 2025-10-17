import React from 'react'

const OurVision = () => {
    return (
        <div className="bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">
                    Our Vision
                </h1>
                <hr className="border-white w-70 mt-3 mx-auto" />
            </div>
            <div className="p-8 text-gray-800 space-y-5 mx-15">
                <p>At <strong>Atal Optical</strong>, our vision is to be the <strong>leading provider of exceptional and accessible eye care solutions across Canada</strong>. We are committed to advancing the standards of the optical industry through innovation, integrity, and compassion, ensuring that every individual has access to superior vision care regardless of their circumstances.

                    We strive to empower Canadians by enhancing their visual health, enabling them to achieve their fullest potential and enjoy a higher quality of life.</p>
            </div>
        </div>
    )
}

export default OurVision