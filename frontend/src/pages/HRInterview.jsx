import React from "react";

const interviewFeatures = [
  {
    title: "STAR Method Guidance",
    description:
      "Master the STAR technique with structured prompts and response validation.",
    views: "2.1K",
    comments: 12,
  },
  {
    title: "Tone & Empathy Feedback",
    description:
      "Get real-time feedback on emotional tone, empathy level, and articulation.",
    views: "1.8K",
    comments: 9,
  },
  {
    title: "Behavioral Question Simulator",
    description:
      "Practice with common HR questions and receive personalized improvement tips.",
    views: "2.5K",
    comments: 15,
  },
];

export default function HRInterview() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {interviewFeatures.map((feature, index) => (
            <div
              className="p-4 lg:w-1/3"
              key={index}
              style={{
                animation: `fadeUp 0.6s ease ${index * 0.2 + 0.2}s both`,
              }}
            >
              <div className="card h-full bg-gray-800 bg-opacity-90 px-8 pt-16 pb-24 rounded-2xl overflow-hidden text-center relative shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_30px_rgba(99,102,241,0.8)]">
                <h2 className="tracking-widest text-xs title-font font-medium text-indigo-400 mb-1">
                  HR MODULE
                </h2>
                <h1 className="title-font sm:text-2xl text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h1>
                <p className="leading-relaxed mb-5 text-gray-300">
                  {feature.description}
                </p>
                <button className="text-indigo-500 inline-flex items-center hover:text-indigo-300 transition duration-300">
                  Try Now
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="text-center mt-4 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 bg-gray-900 bg-opacity-60 rounded-b-2xl">
                  <span className="text-gray-400 mr-4 inline-flex items-center text-sm pr-3 border-r border-gray-700">
                    <svg
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {feature.views}
                  </span>
                  <span className="text-gray-400 inline-flex items-center text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                    {feature.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}
