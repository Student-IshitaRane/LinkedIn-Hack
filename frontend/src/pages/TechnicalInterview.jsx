import React, { useState } from "react";

const TechnicalInterview = () => {
  const [showForm, setShowForm] = useState(false);
  const [resume, setResume] = useState(null);
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");

  const handleInterviewStart = () => {
    if (!resume || !role.trim() || !difficulty) {
      setError("Please fill all the fields before starting the interview.");
      return;
    }
    setError("");
    alert("Interview starting based on your selections...");
    // Add navigation or logic here
  };

  return (
    <section className="relative text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-6 py-20 mx-auto relative z-10">
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
        <div className="flex justify-center mb-10 z-20">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-[0_10px_30px_rgba(99,102,241,0.5)] hover:scale-105 hover:shadow-blue-500/60 transition duration-300 ease-in-out"
          >
            Take an Interview
          </button>
        </div>
      </div>

      {/* Glassmorphic Overlay Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 transition-all duration-300">
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl text-white p-8 rounded-2xl shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-2xl text-gray-300 hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">Interview Setup</h2>
            {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

            <form className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium">Upload Resume<span className="text-red-500">*</span></label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="block w-full p-2 text-sm text-white bg-gray-800 rounded-lg border border-gray-600 placeholder-gray-400"
                  required
                />
              </div>

              {/* Role Input */}
              <div>
                <label className="block mb-2 text-sm font-medium">Role<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Choose role (e.g. frontend, backend, etc.)"
                  className="block w-full p-2 text-sm bg-gray-800 text-white border border-gray-600 rounded-lg placeholder-gray-400"
                  required
                />
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block mb-2 text-sm font-medium">Difficulty Level<span className="text-red-500">*</span></label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="block w-full p-2 text-sm bg-gray-800 text-white border border-gray-600 rounded-lg"
                  required
                >
                  <option value="">Choose Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Start Interview Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleInterviewStart}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-indigo-500/50 transition duration-300"
                >
                  Start Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechnicalInterview;

