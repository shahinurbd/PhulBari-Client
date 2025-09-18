import React from "react";
import { motion } from "framer-motion";
import bg from "../assets/about_img.jpg"
import { Link } from "react-router";

const PetalDivider = ({ className = "", flip = false }) => {
  return (
    <div className={`${className} overflow-hidden`} aria-hidden>
      <svg
        className={`w-full h-28 sm:h-32 md:h-36 ${flip ? "-scale-y-100" : ""}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#FFD1DF" />
            <stop offset="50%" stopColor="#FFECF2" />
            <stop offset="100%" stopColor="#DFF7EE" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#FFE6F0" />
            <stop offset="100%" stopColor="#E6FFF3" />
          </linearGradient>
        </defs>

        
        <g fill="url(#g1)" opacity="0.95">
          <path d="M0 60 C120 20, 240 100, 360 60 C480 20, 600 100, 720 60 C840 20, 960 100, 1080 60 C1200 20, 1320 100, 1440 60 L1440 120 L0 120 Z" />
        </g>

        <g fill="url(#g2)" opacity="0.6">
          <path d="M0 75 C140 35, 280 115, 420 75 C560 35, 700 115, 840 75 C980 35, 1120 115, 1260 75 C1400 35, 1500 115, 1600 75 L1600 140 L0 140 Z" transform="translate(-80,-20)" />
        </g>

        
        <g fill="#FFB7D2" opacity="0.9">
          <circle cx="160" cy="40" r="6" />
          <circle cx="360" cy="30" r="5" />
          <circle cx="560" cy="45" r="7" />
          <circle cx="820" cy="35" r="5" />
          <circle cx="1080" cy="28" r="6" />
          <circle cx="1320" cy="38" r="5" />
        </g>
      </svg>
    </div>
  );
};

const About = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-green-50 font-[Poppins] mt-15 text-gray-800">
      {/* HERO */}
      <section className="relative text-center py-16 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-0 right-4 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-40 -z-10" />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl font-extrabold text-pink-600 drop-shadow-md"
        >
          About Phulbari
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-md sm:text-lg text-gray-700 max-w-3xl mx-auto"
        >
          Where flowers bloom into memories — fresh, handpicked bouquets crafted
          with care for every occasion.
        </motion.p>
      </section>

      
      <PetalDivider className="mx-auto" />

      
      <section className="max-w-7xl mx-auto py-12 sm:py-16 px-6 sm:px-12 lg:px-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-xl"
        >
          <img
            src={bg}
            className="w-full h-80 sm:h-100 object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        <div>
          <h2 className="text-2xl sm:text-4xl font-bold text-pink-600">Who We Are 🌸</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Phulbari isn’t just an online flower shop — it’s a garden of
            emotions. Every bouquet is thoughtfully designed to make your
            celebrations, surprises, and everyday moments unforgettable.
          </p>

          <h3 className="mt-6 text-xl sm:text-2xl font-semibold text-green-600">Our Blossoming Promise</h3>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>🌺 Freshly handpicked blooms every day</li>
            <li>💐 Custom floral designs for weddings and events</li>
            <li>🚚 Fast & reliable doorstep delivery</li>
            <li>💖 Affordable elegance with premium quality</li>
          </ul>

          <div className="mt-6 flex gap-3 flex-wrap">
            <Link to='/shop' >
            <button className="px-6 py-2 rounded-full bg-pink-600 text-white font-semibold shadow hover:scale-105 transition">
              Shop Bouquets
            </button>
            </Link>
            <Link to='/contact' >
            <button className="px-6 py-2 rounded-full border border-pink-300 text-pink-600 font-semibold hover:bg-pink-50 transition">
              Custom Orders
            </button>
            </Link>
          </div>
        </div>
      </section>

      
      <PetalDivider flip className="mx-auto" />

     
      <section className="relative bg-gradient-to-r from-pink-400 via-pink-500 to-red-400 py-12 sm:py-16 text-center text-white overflow-hidden rounded-t-3xl shadow-lg">
        <div className="absolute top-4 left-4 w-28 h-28 bg-white/20 rounded-full blur-xl -z-10" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl font-extrabold"
        >
          Let Phulbari Make Your Moments Bloom 🌼
        </motion.h2>
        <p className="mt-2 text-sm sm:text-lg text-pink-100">Explore our vibrant collection and send love through flowers today.</p>
        <Link to='/shop'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-7 py-3 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:bg-pink-100 transition"
        >
          Shop Now
        </motion.button>
        </Link>
      </section>

      <footer className="py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Phulbari — Fresh flowers, delivered with love.
      </footer>
    </div>
  );
};

export default About;
