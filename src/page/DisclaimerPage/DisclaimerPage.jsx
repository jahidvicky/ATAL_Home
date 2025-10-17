import { useState, useEffect } from 'react';
import API, { IMAGE_URL } from '../../API/Api';

export default function DisclaimerPage() {
  const [showData, setShowData] = useState([]);

  //Get API
  const fetchDesc = async () => {
    try {
      const response = await API.get("/getDisclaimer");
      setShowData(response.data.disclaimerData || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDesc();
  }, []);

  return (
    <>
      <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12">
        <h1 className="text-5xl font-bold text-white text-center">
          Disclaimer of Warranty
        </h1>
        <hr className="border-white w-156 mt-2 mx-90" />
      </header>

      <div className="mx-auto">
        <article className="rounded-2xl p-6 flex flex-col lg:flex-row gap-8">
          {showData.map((data, idx) => (
            <div key={idx} className='flex flex-col lg:flex-row gap-8 items-start'>
              <div className="max-w-lg h-full">
                <img
                  src={IMAGE_URL + data.image}
                  alt="Optical Store"
                  loading="lazy"
                  decoding="async"
                  className="rounded-xl transition-transform duration-400 hover:scale-103 hover:shadow-lg h-full object-cover"
                />
              </div>
              <section className="prose max-w-none leading-relaxed text-gray-800 lg:w-2/3 whitespace-pre-line">
                <p>{data.description}</p>
              </section>
            </div>
          ))}
        </article>
      </div>
    </>
  );
}