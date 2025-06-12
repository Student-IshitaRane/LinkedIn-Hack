import React, { useState } from "react";
import {
  FileTextIcon,
  SearchIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FileTextIcon className="w-10 h-10" />,
    title: "AI Resume Parsing",
    description:
      "Instantly parse your resume and extract key sections like Education, Skills, and Experience.",
  },
  {
    icon: <SearchIcon className="w-10 h-10" />,
    title: "ATS Compatibility Check",
    description:
      "Check your resume’s readability by Applicant Tracking Systems (ATS) and get a compatibility score.",
  },
  {
    icon: <CheckCircle2Icon className="w-10 h-10" />,
    title: "Personalized Suggestions",
    description:
      "Receive intelligent tips to improve grammar, structure, keywords, and overall presentation.",
  },
];

const ResumeAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      console.log("Uploaded file:", file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
            Resume Analyzer Features
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400">
            Upload your resume and unlock deep insights into structure, skills, and ATS optimization.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-4 md:w-1/3 flex flex-col text-center items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-200 text-indigo-700 mb-5 shadow-md">
                {feature.icon}
              </div>
              <div className="flex-grow bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-300">
                <h2 className="text-white text-lg title-font font-semibold mb-3">
                  {feature.title}
                </h2>
                <p className="leading-relaxed text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload Button + Hidden Input */}
        <div className="text-center mt-16">
          <input
            type="file"
            accept="application/pdf"
            id="resume-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-700 rounded text-lg shadow-md hover:shadow-indigo-400/40 transition duration-300 cursor-pointer"
            >
              Upload Your Resume 
            </motion.button>
          </label>

          {/* Display File Name */}
          {selectedFile && (
            <p className="mt-4 text-sm text-gray-300">
              Uploaded: <span className="font-medium text-white">{selectedFile.name}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeAnalyzer;
