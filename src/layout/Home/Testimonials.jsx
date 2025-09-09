import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import API, { IMAGE_URL } from '../../API/Api';

const TestimonialsSlider = () => {
    const [testimonials, setTestimonials] = useState([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const fetchTestimonial = async () => {
        try {
            const response = await API.get("/getTestimonial")
            setTestimonials(response.data.testimonial)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTestimonial()
    }, [])

    return (
        <section className="py-16 px-6 bg-gray-100 text-center">
            <h3 className="text-3xl font-bold">What Our <span className="text-red-600">Customers Say</span></h3>
            <hr className='mb-12 mt-2 w-106 ml-110 border-black'></hr>
            <Slider {...settings}>
                {testimonials.map((item, index) => (
                    <div key={index} className="px-6">
                        <div className="bg-white hover:bg-red-600 hover:text-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto border-1 border-red-600">
                            <div className="flex flex-col items-center">
                                <img
                                    src={IMAGE_URL + item.image}
                                    alt={item.fullName}
                                    className="w-28 h-28 rounded-full object-cover mb-4 shadow"
                                    loading='lazy'
                                    decoding='async'
                                />
                                <div className="w-full flex justify-center text-left pl-4 mb-2">
                                    <h4 className="text-lg font-semibold">{item.fullName}</h4>
                                </div>
                                <h5 className="text-xl font-semibold mb-2">{item.heading}</h5>
                                <p className="italic text-sm mb-4 max-w-xl">"{item.description}"</p>
                                <div className="flex justify-center text-yellow-500 mb-2">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default TestimonialsSlider;
