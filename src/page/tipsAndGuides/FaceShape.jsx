import React from "react";
import { NavLink } from "react-router-dom";
import HeartImg from "../../assets/faceShape/Heart.jpeg";
import OvalImg from "../../assets/faceShape/Oval.jpeg";
import RoundImg from "../../assets/faceShape/Round.jpeg";
import SquareImg from "../../assets/faceShape/Square.jpeg";
import TriangleImg from "../../assets/faceShape/Triangle.jpeg";
import GlassesImg from "../../assets/faceShape/glasses.jpeg";
import SunglassesImg from "../../assets/faceShape/Sunglasses.jpeg";

export default function FaceShape() {
  const imgHero = RoundImg;

  const faceImages = [
    { id: "oval", label: "Shop for Oval", src: OvalImg },
    { id: "round", label: "Shop for Round", src: RoundImg },
    { id: "heart", label: "Shop for Heart", src: HeartImg },
    { id: "square", label: "Shop for Square", src: SquareImg },
    { id: "triangle", label: "Shop for Triangle", src: TriangleImg },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-[#f00000]">Face Shape</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h2 className="text-center lg:text-left text-2xl font-semibold mb-4">
              Glasses for face shape
            </h2>
            <p className="text-center lg:text-left text-sm text-gray-600 max-w-md mx-auto lg:mx-0">
              Which shape is your (beautiful) face? Read on to find out, then
              shop frames for square, round, heart, diamond and oval shapes.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="w-full overflow-hidden rounded-r-lg">
              <img
                src={imgHero}
                alt="hero face"
                className="block w-full h-96 object-cover rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Face Shape Grid */}
      <section className="pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <h3 className="text-center text-xl font-medium mb-8">
            Shop glasses by face shape
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
            {faceImages.map((f) => (
              <div key={f.id} className="flex flex-col items-center">
                <div className="w-full overflow-hidden rounded shadow-sm bg-gray-50">
                  <img
                    src={f.src}
                    alt={f.id}
                    className="block w-full h-56 object-cover"
                  />
                </div>

                <NavLink
                  to={`/glasses/${f.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "mt-6 w-48 md:w-56 lg:w-48 py-3 bg-black text-white rounded-md text-sm font-medium text-center"
                      : "mt-6 w-48 md:w-56 lg:w-48 py-3 bg-black text-white rounded-md text-sm font-medium text-center hover:bg-[#f00000]"
                  }
                >
                  {f.label}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <h3 className="text-center text-xl font-medium mb-8">
            Glasses shopping tips
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <article className="bg-white">
              <div className="h-64 bg-purple-50 overflow-hidden rounded">
                <img
                  src={GlassesImg}
                  alt="tip1"
                  className="block w-full h-full object-contain"
                />
              </div>
              <div className="py-6 text-center">
                <h4 className="font-semibold mb-2">Glasses</h4>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-4">
                  Discover the best glasses for your face shape. Let's
                  Explore.
                </p>
                <NavLink
                  to="/allproduct/glasses/69157332eeb23fa59c7d5326"
                  className=" px-6 py-2 bg-black text-white rounded  "
                >
                  Shop Now
                </NavLink>
              </div>
            </article>

            <article className="bg-white">
              <div className="h-64 bg-blue-50 overflow-hidden rounded">
                <img
                  src={SunglassesImg}
                  alt="tip2"
                  className="block w-full h-full object-contain"
                />
              </div>
              <div className="py-6 text-center">
                <h4 className="font-semibold mb-2">Sunglasses</h4>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-4">
                  Discover the best sunglasses for your face shape. Let's
                  Explore.
                </p>
                <NavLink
                  to="/allproduct/sunglasses/6915705d9ceac0cdda41c83f"
                  className=" px-6 py-2 bg-black text-white rounded  "
                >
                  Shop Now
                </NavLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © Atal Optical
        </div>
      </footer>
    </div>
  );
}
