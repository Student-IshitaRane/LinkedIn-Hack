import React from "react";
import { motion } from "framer-motion";

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
    </section>
  );
}





