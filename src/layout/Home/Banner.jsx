import React from "react";
import Slider from "react-slick";
import slider1 from '../../assets/banner/slider1.webp';
import slider2 from '../../assets/banner/slider2.webp';
import slider3 from '../../assets/banner/slider3.webp';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const data = [
  {
    img: slider2,
  },
  {
    img: slider1,
  },
  {
    img: slider3,
  },
];

function Banner() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    pauseOnHover: false
  };

  return (
    <div className="h-full">
      <div className="relative">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.img}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover items-center justify-center"
                alt={`slider-${index}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>

  );
}

export default Banner;
