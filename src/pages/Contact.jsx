import React, { useState } from "react";
import { FiMail, FiPhone, FiGlobe, FiClock } from "react-icons/fi";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import apiClient from "../services/api-client";
import SuccessAlert from "../components/SuccessAlert";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.post("/contact/", formData);
      setResponseMsg(res.data.success);
    } catch (err) {
      setResponseMsg(err,"Failed to send message. Try again.");
    } finally{
      setLoading(false);
    }
  };

  return (
    <section className="bg-white text-gray-800 mt-20 font-[poppins]">
      {/* Top contact info */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center mb-3 bg-white hover:bg-pink-600 text-gray-600 hover:text-white">
              <FiMail className="text-lg " />
            </div>
            <h4 className="text-sm font-medium">Email Address</h4>
            <p className="text-sm text-gray-500 mt-2">info@webmail.com</p>
            <p className="text-sm text-gray-500">jobs@webexample.com</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center mb-3 bg-white hover:bg-pink-600 text-gray-600 hover:text-white">
              <FiPhone className="text-lg " />
            </div>
            <h4 className="text-sm font-medium">Phone Number</h4>
            <p className="text-sm text-gray-500 mt-2">+1234-567 890</p>
            <p className="text-sm text-gray-500">+09876-543 210</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center mb-3 bg-white hover:bg-pink-600 text-gray-600 hover:text-white">
              <FiGlobe className="text-lg" />
            </div>
            <h4 className="text-sm font-medium">Email & Web</h4>
            <p className="text-sm text-gray-500 mt-2">info@webmail.com</p>
            <p className="text-sm text-gray-500">jobs@webexample.com</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center mb-3 bg-white hover:bg-pink-600 text-gray-600 hover:text-white">
              <FiClock className="text-lg " />
            </div>
            <h4 className="text-sm font-medium">Opening Hours</h4>
            <p className="text-sm text-gray-500 mt-2">Fri to Wed: 9:00 AM - 8:00 PM</p>
            <p className="text-sm text-gray-500">Thursday - Off</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="px-6 mt-8">
        <div className="max-w-6xl mx-auto overflow-hidden rounded shadow-sm border border-gray-100">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9533186127574!2d-73.96318622420334!3d40.66810577139895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0482824c6b%3A0x7a9c1b5c24ed7e3d!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sus!4v1692387594081!5m2!1sen!2sus"
            className="w-full h-56 md:h-80 lg:h-96 border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-center text-base font-semibold mb-8">Need Our Help? Please Send an Email.</h2>
        {responseMsg && <div className="max-w-lg flex justify-center mx-auto py-8"><SuccessAlert success={responseMsg} /></div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left column: inputs + button. Using a min-height so button sits near bottom on larger screens */}
          <div className="flex flex-col justify-between gap-4 min-h-[260px] md:min-h-[220px]">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                name="name"
                required 
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-sm text-sm placeholder-gray-400 border border-gray-100"
              />

              <input
                 type="email"
                  name="email"
                  placeholder="Email"
                  required 
                  onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-sm text-sm placeholder-gray-400 border border-gray-100"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required 
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-sm text-sm placeholder-gray-400 border border-gray-100"
              />

              <input
                type="text"
                name="title"
                placeholder="Your Title"
                required 
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-sm text-sm placeholder-gray-400 border border-gray-100"
              />
            </div>

            
          </div>

          {/* Right column: large textarea */}
          <div>
            <textarea
              name="message"
              placeholder="Enter message"
              required 
              onChange={handleChange}
              className="w-full min-h-[260px] md:min-h-[220px] p-4 rounded-sm border border-gray-200 text-sm resize-none placeholder-gray-400"
            ></textarea>
          </div>

          <div>
              <button type="submit" className="inline-block bg-pink-600 text-white px-5 py-2 rounded text-sm uppercase tracking-wide hover:bg-pink-700 transition">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
        </form>
      </div>
    </section>
  );
}
