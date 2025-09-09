import { useEffect } from "react";
import CountUp from "react-countup";
import { useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";

const Review = () => {
  const [reviews, setReviews] = useState([{}]);
  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await API.get("/getreview");
      setReviews(res.data.reviews || []);
      //   console.log(res.data.reviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <>
      {reviews.map((data, index) => (
        <div key={index} className="flex md:mt-26 mt-16">
          <div>
            <div className="md:ml-26 md:mx-0 mx-6">
              <p className="text-3xl font-bold">
                We are experienced and professional
              </p>
              <hr className="border-black mt-2 md:w-122 w-42"></hr>
              <p className="mt-6">{data.description}</p>
              <div className="flex mt-10 gap-10 items-center">
                <div className="flex flex-col">
                  <div className="font-bold text-3xl">
                    <CountUp start={0} end={Number(data.followers) || 0} duration={3} />
                    k+
                  </div>
                  <p className="text-lg">Followers</p>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-3xl">
                    <CountUp start={0} end={Number(data.frames) || 0} duration={3} />
                    k+
                  </div>
                  <p className="text-lg">Frames</p>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-3xl">
                    <CountUp start={0} end={Number(data.customer) || 0} duration={3} />%
                  </div>
                  <p className="text-lg">Satisfied Customer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-16 ml-20 pb-20 w-800 md:block hidden">
            <div className="bg-red-600 rounded-xl ">
              <img
                src={`${IMAGE_URL + data.image}`}
                alt="woman"
                loading="lazy"
                decoding="async"
                className="rounded-xl w-full h-full -translate-6 border-red-600 border-2 "
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Review;
