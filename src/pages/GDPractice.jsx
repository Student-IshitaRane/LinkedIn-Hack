import React from "react";
import { motion } from "framer-motion";

const GDPractice = () => {
  const steps = [
    {
      title: "Step 1: Topic Introduction",
      description:
        "Understand the given topic and gather your thoughts. Stay calm and listen carefully.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
    },
    {
      title: "Step 2: Express Your Views",
      description:
        "Speak clearly and confidently. Make sure to contribute meaningful points to the discussion.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
    },
    {
      title: "Step 3: Listen Actively",
      description:
        "Pay attention to other participants’ points. Show respect and build on others' ideas.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="5" r="3"></circle>
          <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
        </svg>
      ),
    },
    {
      title: "Step 4: Summarize the Discussion",
      description:
        "Conclude the discussion by summarizing key points. Keep it concise and clear.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      title: "Finish: Reflect & Improve",
      description:
        "Reflect on your performance. Note what worked well and areas to improve for next time.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
          <path d="M22 4L12 14.01l-3-3"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="text-gray-300 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {steps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                key={idx}
                className={`flex relative ${
                  idx !== steps.length - 1 ? "pb-12" : ""
                }`}
              >
                {idx !== steps.length - 1 && (
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-700 pointer-events-none"></div>
                  </div>
                )}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 shadow-lg hover:scale-110 transform transition duration-300 inline-flex items-center justify-center text-white relative z-10">
                  {step.icon}
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-semibold title-font text-sm text-white mb-1 tracking-wider hover:text-indigo-400 transition">
                    {step.title}
                  </h2>
                  <p className="leading-relaxed text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg shadow-2xl md:mt-0 mt-12"
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
            alt="Group Discussion"
          />
        </div>
      </div>
    </section>
  );
};

export default GDPractice;