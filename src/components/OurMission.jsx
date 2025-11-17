import React from 'react'

const OurMission = () => {
    return (
        <div className="bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                <h1 className="text-5xl font-bold text-white">
                    Our Mission
                </h1>
                <hr className="border-white w-80 mt-3 mx-auto" />
            </div>
            <div className="p-8 text-gray-800 space-y-5 mx-15">
                <p>At <strong>Atal Optical</strong>, our mission is to <strong>deliver exceptional eye care and high-quality eyewear that is accessible and affordable to all Canadians</strong>. We are dedicated to enhancing lives by improving vision through cutting-edge technology, compassionate service, and community-focused initiatives.</p>
                <h1 className="text-xl font-medium">
                    We strive to:
                </h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide personalized and comprehensive optical solutions tailored to each individual’s needs.</li>
                    <li>Ensure that no one is left behind by offering <strong>free glasses to those who cannot afford them</strong>.</li>
                    <li>Foster trust, integrity, and excellence in every aspect of our business.</li>
                    <li>Build lasting relationships with our customers by prioritizing their eye health and overall well-being.</li>
                </ul>
                <p>Our commitment is to <strong>empower people to see clearly, live confidently, and thrive fully</strong>.</p>
            </div>
        </div>
    )
}

export default OurMission