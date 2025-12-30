import { motion } from "framer-motion";
import LocationImg from "../../assets/loaction/location.jpg";

const Locations = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-[#f00000] py-24"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            GTA Location
          </h1>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="w-full bg-white py-14 mb-15 mt-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Map */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Business Meetings Corporate Office
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                34 Shining Willow Crescent, Brampton ON L6P 2A2
              </p>

              <div className=" h-[330px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d92184.66157570534!2d-79.70100400000001!3d43.777619!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3d2ea6682429%3A0x12f3af2ab9805bc7!2s34%20Shining%20Willow%20Crescent%2C%20Brampton%2C%20ON%20L6P%202A2%2C%20Canada!5e0!3m2!1sen!2sus!4v1767009026603!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                />
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={LocationImg}
                alt="Office Location"
                className="ml-10 h-[330px] object-cover rounded-lg shadow-md mt-17 transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Locations;
