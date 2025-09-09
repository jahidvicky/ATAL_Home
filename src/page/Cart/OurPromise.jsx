import { FaEye } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";

export default function OurPromise() {
  const promises = [
    { icon: <FaEye size={40} />, text: "AFFORDABLE EYEWEAR" },
    { icon: <FaShippingFast size={40} />, text: "FAST SHIPPING" },
    { icon: <FaBoxOpen size={40} />, text: "FREE RETURNS" },
    { icon: <FaHeadset size={40} />, text: "24/7 CUSTOMER CARE" },
  ];

  return (
    <div className="w-full py-10 bg-white">
      <h2 className="text-center text-3xl font-semibold">OUR PROMISE</h2>
      <hr className="mb-14 mt-2 border-black mx-130"></hr>
      <div className="grid grid-cols-2 md:grid-cols-4 mx-auto text-center">
        {promises.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-3 bg-black py-6 mx-6 text-white hover:bg-red-600 hover:cursor-pointer hover:scale-110">
            <div className="">{item.icon}</div>
            <p className="font-medium ">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
