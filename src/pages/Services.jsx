import React from "react";
import { motion } from "framer-motion";
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
          <linearGradient id="s1" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#FFD1DF" />
            <stop offset="50%" stopColor="#FFECF2" />
            <stop offset="100%" stopColor="#DFF7EE" />
          </linearGradient>
        </defs>

        <g fill="url(#s1)" opacity="0.9">
          <path d="M0 60 C120 20, 240 100, 360 60 C480 20, 600 100, 720 60 C840 20, 960 100, 1080 60 C1200 20, 1320 100, 1440 60 L1440 120 L0 120 Z" />
        </g>

        <g fill="#FFB7D2" opacity="0.8">
          <circle cx="160" cy="40" r="6" />
          <circle cx="400" cy="25" r="5" />
          <circle cx="720" cy="38" r="7" />
          <circle cx="1000" cy="28" r="6" />
          <circle cx="1320" cy="42" r="5" />
        </g>
      </svg>
    </div>
  );
};

const services = [
  {
    title: "Custom Bouquets",
    description: "Handcrafted flower arrangements tailored to your occasion.",
    icon: "💐",
  },
  {
    title: "Event Decoration",
    description: "Beautiful floral setups for weddings, birthdays, and parties.",
    icon: "🎉",
  },
  {
    title: "Same-Day Delivery",
    description: "Fresh flowers delivered to your doorstep, right on time.",
    icon: "🚚",
  },
  {
    title: "Corporate Gifting",
    description: "Elegant flower gifts designed for businesses and clients.",
    icon: "🎁",
  },
];

const Services = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 mt-15 via-white to-green-50 font-[Poppins] text-gray-800">
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
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-md sm:text-lg text-gray-700 max-w-3xl mx-auto"
        >
          Blossoming services designed to make your moments more colorful,
          elegant, and unforgettable.
        </motion.p>
      </section>

      {/* Petal Divider */}
      <PetalDivider className="mx-auto" />

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto py-12 sm:py-16 px-6 sm:px-12 lg:px-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-pink-600">{service.title}</h3>
            <p className="mt-3 text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Petal Divider flipped */}
      <PetalDivider flip className="mx-auto" />

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-pink-400 via-pink-500 to-red-400 py-12 sm:py-16 text-center text-white overflow-hidden rounded-t-3xl shadow-lg">
        <div className="absolute top-4 left-4 w-28 h-28 bg-white/20 rounded-full blur-xl -z-10" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl font-extrabold"
        >
          Bring Your Ideas to Bloom 🌼
        </motion.h2>
        <p className="mt-2 text-sm sm:text-lg text-pink-100">
          Contact us today and let Phulbari make your moments blossom.
        </p>
        <Link to='/contact'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-7 py-3 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:bg-pink-100 transition"
        >
          Get in Touch
        </motion.button>
        </Link>
      </section>

      <footer className="py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Phulbari — Fresh flowers, delivered with love.
      </footer>
    </div>
  );
};

export default Services;