import React from "react";
import Slider from "react-slick";
import slider1 from '../../assets/banner/slider1.webp';
import slider2 from '../../assets/banner/ban1.png';
import slider3 from '../../assets/banner/ban2.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

const data = [
  {
    img: slider2,
    buttonText: "Shop now",
    buttonLink: "/products/collection/trending",
    buttonColor: "#ffffff",
    textColor: "#1f1f20"
  },
  {
    img: slider1,
    buttonText: "Explore",
    buttonLink: "/allproduct/contact_lenses/6915735feeb23fa59c7d532b",
    buttonColor: "#e5e911ff",
    textColor: "#ffffff"
  },
  {
    img: slider3,
    buttonText: "View Deals",
    buttonLink: "/products/collection/best-seller",
    buttonColor: "#ff5252",
    textColor: "#000000"
  },
];

function Banner() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
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
              {/* Background Image */}
              <img
                src={item.img}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
                alt={`slider-${index}`}
              />

              {/* Overlay */}
              <div className="banner-overlay"></div>

              {/* Text Content */}
              <div className="banner-content">
                <div className="banner-text-wrapper">
                  <h3 className="banner-subtitle">{item.subtitle}</h3>
                  <h1 className="banner-title">{item.title}</h1>
                  <p className="banner-description">{item.description}</p>

                  {/* Button with dynamic color */}
                  <button
                    className="banner-button"
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
