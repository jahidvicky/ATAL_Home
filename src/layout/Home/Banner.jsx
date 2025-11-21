import React from "react";
import Slider from "react-slick";

import slider1 from '../../assets/banner/ban11.jpeg';
import slider2 from '../../assets/banner/ban22.jpeg';
import slider3 from '../../assets/banner/ban33.jpeg';
import slider4 from '../../assets/banner/ban44.jpeg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

const data = [
  {
    img: slider2,
    buttonText: "Shop Eyeglasses",
    buttonLink: "/allproduct/glasses/69157332eeb23fa59c7d5326",
    buttonColor: "#ffffff",
    textColor: "#1f1f20",
    buttonPosition: "left"
  },
  {
    img: slider1,
    buttonText: "Upgrade Your Look",
    buttonLink: "/allproduct/sunglasses/6915705d9ceac0cdda41c83f",
    buttonColor: "#beaf9aff",
    textColor: "#000000",
    buttonPosition: "center"
  },
  {
    img: slider3,
    title: "Find Your Style",
    subtitle: "Comfort • Clarity • Confidence",
    description: "Choose from our best-selling glasses designed for everyday comfort.",
    buttonText: "Find Your Style",
    buttonLink: "/allproduct/contact_lenses/6915735feeb23fa59c7d532b",
    buttonColor: "#ff5252",
    textColor: "#ffffff",
    buttonPosition: "left1"
  },
  {
    img: slider4,
    buttonText: "Explore Lenses",
    buttonLink: "/allproduct/contact_lenses/6915735feeb23fa59c7d532b",
    buttonColor: "#0d5648",
    textColor: "#ffffff",
    buttonPosition: "center1"
  },
];

function Banner() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const handleButtonClick = (link) => {
    window.location.href = link;
  };

  return (
    <div className="h-full">
      <div className="relative banner-container">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index} className="relative banner-slide">

              <img
                src={item.img}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
                alt={`slider-${index}`}
              />

              <div className="banner-overlay"></div>

              <div className="banner-content">
                <div className="banner-text-wrapper">

                  <h3 className="banner-subtitle">{item.subtitle}</h3>
                  <h1 className="banner-title">{item.title}</h1>
                  <p className="banner-description">{item.description}</p>

                  <button
                    className={`banner-button position-${item.buttonPosition}`}
                    style={{
                      backgroundColor: item.buttonColor,
                      color: item.textColor,
                    }}
                    onClick={() => handleButtonClick(item.buttonLink)}
                  >
                    {item.buttonText}
                  </button>

                </div>
              </div>

            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Banner;
