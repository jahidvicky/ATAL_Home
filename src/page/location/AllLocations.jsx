import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API, { IMAGE_URL } from "../../api/api"; // adjust path if this file lives elsewhere
import { getMapEmbedUrl } from "../../utils/mapEmbed";

const resolveImgSrc = (img) => {
  if (!img) return null;
  return img.startsWith("http") ? img : `${IMAGE_URL}${img}`;
};

const AllLocations = () => {
  const [locationsData, setLocationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await API.get("/location");
        const data = res.data.data || res.data;
        setLocationsData(
          data.map((loc) => ({
            title: loc.title,
            address: loc.address,
            map: getMapEmbedUrl(loc.mapQuery),
            image: resolveImgSrc(loc.image),
          }))
        );
      } catch (err) {
        console.error("Failed to load locations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  return (
    <>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-[#f00000] py-24"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Our Locations
          </h1>
        </div>
      </motion.section>

      {/* All Locations */}
      <section className="w-full bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {loading && (
            <p className="text-center text-gray-500">Loading locations...</p>
          )}

          {!loading && locationsData.length === 0 && (
            <p className="text-center text-gray-500">
              No locations available right now.
            </p>
          )}

          {locationsData.map((loc, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
            >
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {loc.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{loc.address}</p>

                <div className="h-[330px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <iframe
                    src={loc.map}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={loc.title}
                  />
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={loc.image}
                  alt={loc.title}
                  className="mt-19 ml-10 w-full h-[330px] object-cover rounded-lg shadow-md transform transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllLocations;