import { motion } from "framer-motion";

import bramptonLocation from "../../assets/loaction/bramptonLocation.jpg";
import eastLocation from "../../assets/loaction/eastLocation.jpg";
import westLocation from "../../assets/loaction/westLocation.jpg";
import northLocation from "../../assets/loaction/northLocation.jpg";
import southLocation from "../../assets/loaction/southLocation.jpg";

const locationsData = [
  {
    title: "Business Meetings Corporate Office",
    address: "34 Shining Willow Crescent, Brampton ON L6P 2A2",
    map: "https://www.google.com/maps?q=34+Shining+Willow+Crescent,+Brampton,+ON+L6P+2A2,+Canada&output=embed",
    image: bramptonLocation,
  },
  {
    title: "East Location",
    address: "5 Cherrycrest Drive, Brampton, ON L6P 3W4, Canada",
    map: "https://www.google.com/maps?q=5+Cherrycrest+Drive,+Brampton,+ON+L6P+3W4,+Canada&output=embed",
    image: eastLocation,
  },
  {
    title: "West Location",
    address: "10 Henderson Ave Unit #4, Brampton, ON L6Y 2A4, Canada",
    map: "https://www.google.com/maps?q=10+Henderson+Ave+Unit+4,+Brampton,+ON+L6Y+2A4,+Canada&output=embed",
    image: westLocation,
  },
  {
    title: "North Location",
    address: "9 Ash Hill Ave, Caledon East, ON L7C 0H3, Canada",
    map: "https://www.google.com/maps?q=9+Ash+Hill+Ave,+Caledon+East,+ON+L7C+0H3,+Canada&output=embed",
    image: northLocation,
  },
  {
    title: "South Location",
    address: "Ottawa, ON, Canada",
    map: "https://www.google.com/maps?q=Ottawa,+ON,+Canada&output=embed",
    image: southLocation,
  },
];

const AllLocations = () => {
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
                <p className="text-gray-600 mb-4 text-sm">
                  {loc.address}
                </p>

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