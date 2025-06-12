import React from "react";

const TechnicalInterview = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-6 py-20 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row w-full mb-12 items-start md:items-center">
          <h1 className="text-3xl font-semibold title-font text-white md:w-1/3 mb-4 md:mb-0">
            AI Interview Simulator Highlights
          </h1>
          <p className="md:pl-6 md:w-2/3 text-base text-gray-300 leading-relaxed">
            Dive into snapshots from our immersive mock interviews. Watch AI avatars in action, real-time feedback overlays, confidence heatmaps, and the simulated interview environment designed to sharpen your responses.
          </p>
        </div>

        {/* Image Grid */}
        <div className="flex flex-wrap -m-2 mb-16">
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-wrap">
            {[
              {
                alt: "AI Avatar Interface",
                src: "https://dummyimage.com/500x300/1e40af/ffffff&text=AI+Avatar+View",
              },
              {
                alt: "Candidate Response Analyzer",
                src: "https://dummyimage.com/501x301/1e293b/ffffff&text=Live+Transcript",
              },
              {
                alt: "Interview Questions Panel",
                src: "https://dummyimage.com/600x360/334155/ffffff&text=Question+Panel",
              },
            ].map((img, idx) => (
              <div key={idx} className={`p-2 ${idx === 2 ? "w-full" : "w-1/2"} group`}>
                <img
                  alt={img.alt}
                  src={img.src}
                  className="w-full h-full object-cover object-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-400/40"
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 flex flex-wrap">
            {[
              {
                alt: "Feedback Heatmap",
                src: "https://dummyimage.com/601x361/1e293b/ffffff&text=Confidence+Heatmap",
              },
              {
                alt: "Eye Contact Detection",
                src: "https://dummyimage.com/502x302/1e3a8a/ffffff&text=Eye+Contact",
              },
              {
                alt: "Tone & Emotion Feedback",
                src: "https://dummyimage.com/503x303/0369a1/ffffff&text=Tone+Feedback",
              },
            ].map((img, idx) => (
              <div key={idx} className={`p-2 ${idx === 0 ? "w-full" : "w-1/2"} group`}>
                <img
                  alt={img.alt}
                  src={img.src}
                  className="w-full h-full object-cover object-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-400/40"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-[0_10px_30px_rgba(99,102,241,0.5)] hover:scale-105 hover:shadow-blue-500/60 transition duration-300 ease-in-out">
            Take an Interview
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnicalInterview;
