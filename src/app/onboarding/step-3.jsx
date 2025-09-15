"use client";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import Dropdown from "@/components/Dropdown";

export default function Step3({ onNext, onBack }) {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [resume, setResume] = useState(null);

  const roles = ["Frontend Developer", "Backend Developer", "Full Stack", "UI/UX Designer"];
  const experiences = ["Fresher", "1-2 years", "2-5 years", "5+ years"];
  const companies = ["Google", "Amazon", "Microsoft", "Other"];

  const handleSubmit = () => {
    onNext({ role, experience, company, resume });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) { // max 1MB
      setResume(file);
    } else {
      alert("File size must be less than 1MB");
    }
  };

  return (
    <div className="relative w-full h-screen bg-white px-4 pt-10 font-inter">
      {/* Progress Bar */}
      <ProgressBar step={3} />

      {/* Heading */}
      <h2 className="text-[32px] font-noto font-[700] text-black mb-8 mt-4">Set Up</h2>

      {/* Target Role Dropdown */}
      <Dropdown
        label="Target Position / Role"
        options={roles}
        value={role}
        onChange={setRole}
      />

      {/* Experience Dropdown */}
      <Dropdown
        label="Experience"
        options={experiences}
        value={experience}
        onChange={setExperience}
      />

      {/* Company Dropdown (Optional) */}
      <Dropdown
        label="Company (Optional)"
        options={companies}
        value={company}
        onChange={setCompany}
      />

      {/* Resume Upload */}
      <div className="mb-4">
        <label className="block mb-2 text-[14px] font-noto font-[500] text-black">
          Resume (Optional, Max 1MB)
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="w-full px-4 py-3 border rounded-lg"
        />
        {resume && <p className="mt-2 text-[12px] text-green-600">{resume.name}</p>}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg text-white font-[700] bg-gray-500 hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!role || !experience}
          className="px-6 py-3 rounded-lg text-white font-[700] bg-black hover:bg-gray-900"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
