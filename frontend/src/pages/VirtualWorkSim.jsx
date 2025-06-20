import React from "react";
import { motion } from "framer-motion";
import virtualOfficeImg from "../assets/VirtualOffice.avif"; 

const resources = [
  {
    id: 1,
    title: "Virtual Work Simulation",
    description:
      "Experience a virtual tech office day: standups, chats, manager check-ins, and more with AI avatars.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-12 h-12"
        viewBox="0 0 24 24"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "👥 Virtual Office Simulation",
    description:
      "Daily standups, AI chats, and team bonding moments",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-12 h-12"
        viewBox="0 0 24 24"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "🧠 CultureMatch AI",
    description:
      "Real-life dilemmas, ethical situations, and casual interactions",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-12 h-12"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="5" r="3"></circle>
        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "💻 Dynamic Role Tasks",
    description:
      "Coding and decision-making tasks crafted by GenAI",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-12 h-12"
        viewBox="0 0 24 24"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  },
  {
    id: 5,
    title: "📊 AI Evaluation Dashboard",
    description:
      "Insightful behavioral, communication, and performance metrics",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-12 h-12"
        viewBox="0 0 24 24"
      >
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
        <path d="M22 4L12 14.01l-3-3"></path>
      </svg>
    ),
  },
];

export default function ResourcesPage() {
  return (
    <div>
          {/* Virtual Work Simulation Section */}
          <section className="bg-gray-950 text-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h2 className="text-4xl font-bold mb-4">
                  Experience the Virtual Work Simulation
                </h2>
                <p className="text-gray-400 text-lg mb-6">
                  Step into a full day-in-the-life virtual tech office. Powered by GenAI, avatars, STT and TTS, this simulation mimics real job workflows — from standups and manager check-ins to fun hours and peer chats.
                  <br /><br />
                  With CultureMatch AI and dynamic coding challenges, recruiters evaluate real-time behavior, communication, and decision-making — not just resumes. Perfect for students & professionals to showcase how they actually work.
                </p>
                <button
                  onClick={() => window.open("https://teamflow-phi.vercel.app/", "_blank")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg rounded-lg font-semibold shadow-lg hover:shadow-indigo-700 transition"
                >
                  Enter VirtualOffice
                </button>
              </div>
    
              <div className="lg:w-1/2 flex justify-center">
                <img
                  src={virtualOfficeImg}
                  alt="Virtual Work Office"
                  className="rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.6)] w-full max-w-md object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>
          </section>

    <section className="bg-gray-900 text-gray-300 body-font">
      <div className="container px-5 py-24 mx-auto">
        {resources.map(({ id, title, description, icon }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: id * 0.1 }}
            className={`flex relative pb-20 sm:items-center md:w-2/3 mx-auto ${
              id === resources.length ? "pb-10" : ""
            }`}
          >
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              {id !== resources.length && (
                <div className="h-full w-1 bg-gray-700 pointer-events-none"></div>
              )}
            </div>
            <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white z-10 title-font font-medium text-sm shadow-md">
              {id}
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row transition duration-300"
            >
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center shadow-lg hover:shadow-indigo-400 transition-shadow">
                {icon}
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-white mb-1 text-xl">
                  {title}
                </h2>
                <p className="leading-relaxed text-gray-400">{description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
          <div className="flex justify-center">
            <button
              onClick={() => window.open("https://teamflow-phi.vercel.app/", "_blank")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg rounded-lg font-semibold shadow-lg hover:shadow-indigo-700 transition"
            >
              Enter VirtualOffice
            </button></div>
    </section>
    </div>
  );
}





