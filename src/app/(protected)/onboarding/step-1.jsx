"use client";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function Step1({ onNext }) {
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");

  const degrees = ["B.Tech", "B.Sc", "M.Tech", "M.Sc"];
  const universities = ["IIT Delhi", "IIT Bombay", "Delhi University", "Other"];

  return (
    <div className="relative w-full min-h-screen bg-white px-4 pt-10 text-left font-inter">
      {/* Progress Bar */}
      <ProgressBar step={1} />

      {/* Heading */}
      <h2 className="text-[32px] font-[700] font-noto text-black mb-8">
        Education Details
      </h2>

      {/* Degree Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-[14px] font-noto font-[500] text-black">
          Degree
        </label>
        <div className="rounded-[8px] p-[2px] bg-gradient-to-r from-[#0F35FF] via-[#94288A] to-[#E8D610]">
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full h-[56px] px-4 rounded-[6px] text-black font-noto text-[14px] focus:outline-none appearance-none bg-white"
          >
            <option value="" disabled>
              Select Degree
            </option>
            {degrees.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* University Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-[14px] font-noto font-[500] text-black">
          University
        </label>
        <div className="rounded-[8px] p-[2px] bg-gradient-to-r from-[#0F35FF] via-[#94288A] to-[#E8D610]">
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full h-[56px] px-4 rounded-[6px] text-black font-noto text-[14px] focus:outline-none appearance-none bg-white"
          >
            <option value="" disabled>
              Select University
            </option>
            {universities.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onNext({ degree, university })}
        disabled={!degree || !university}
        className={`w-full mt-8 py-3 rounded-lg text-white text-[16px] font-[700] 
          ${degree && university ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
      >
        Next
      </button>
    </div>
  );
}
