import React, { useEffect, useState } from "react";
import flowerJar from "../../assets/Discount/flowerJar.png"
import flowerbg from "../../assets/Discount/fbg.jpg";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import { Link } from "react-router";

const DiscountSection = () => {
    // Set your countdown target date here (e.g., 1 minute from now)
    const targetDate = new Date("2025-08-12T00:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    // Function to calculate remaining time
    function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
    }

    // Update every second
    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className="bg-cover bg-center bg-blend-soft-light bg-white/80" style={{ backgroundImage: `url(${flowerbg})` }}>
            <div className="flex flex-col md:flex-row items-center justify-between px-6 max-w-7xl mx-auto gap-10 py-16 font-[Poppins] " >
            {/* Left Section */}
            <div className="flex flex-col lg:gap-10 md:gap-8 gap-6 text-center md:text-left">
                <p className="text-pink-600 font-semibold">Deal of the day</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl ">
            Shop Your Flower <br></br>Best Offer - $12
            </h2>

            {/* Countdown */}
            <div className="flex gap-2 justify-center md:justify-start">
            {[
            { label: "Days", value: timeLeft.days },
            { label: "Hrs", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds },
            ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg flex flex-col items-center"
            >
              <span className="text-xl font-bold">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-sm">{label}</span>
            </div>
         ))}
        </div>

        <Link to='/shop'>
        <button className="bg-pink-900 hover:bg-pink-600 text-white px-6 py-3 rounded-full w-fit self-center md:self-start mt-4">
          Shop now
        </button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="lg:ml-40 hidden md:block">
        <div className="overflow-hidden md:w-64 md:h-64 lg:w-74 lg:h-74 flex items-center justify-center">
          <img
            src={flowerJar}
            alt="Discount Flowers"
            className="object-contain"
          />
        </div>
       
      </div>
      </div>
        </div>
    );
};

export default DiscountSection;