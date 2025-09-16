"use client";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function Step2({ onNext, onBack }) {
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("File size must be <= 1MB");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white px-4 pt-10 text-left font-inter">
      {/* Progress Bar */}
      <ProgressBar step={2} />


      <div>

      {/* Skip Button */}
      <button
        onClick={onNext}
        className="absolute top-6  right-4 text-[14px] font-[700] text-black bg-gray-100 px-3 py-1 rounded-full"
        >
        Skip
      </button>
    </div>

      {/* Heading */}
      <h2 className="text-[24px] font-noto font-[700] text-black text-center mt-8">
        Add a Profile Picture
      </h2>
      <p className="text-[16px] font-noto font-[400] text-black text-center mt-2">
        Take or Upload a picture upto 1MB
      </p>
      <p className="text-[12px] font-hind font-[400] text-black text-center mt-1">
        Note: jpg or png format only
      </p>

      {/* Profile Image Circle */}
      <div className="relative w-[176px] h-[176px] mx-auto mt-8 rounded-full border border-gray-400 bg-gray-200 flex items-center justify-center overflow-hidden">
        
          <img src="/camera.png" alt="Profile" className="" />
       
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-2 text-[12px] font-hind">
          Upload Photo
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-12 flex flex-col gap-4">
        <div className="outline-gradient-to-r from-[#0F35FF] via-[#94288A] to-[#E8D610] rounded-[24px]">
        <button
          onClick={() => document.getElementById("take-photo").click()}
          className="w-full h-[56px] bg-black text-white font-[800] rounded-[24px] shadow-md outline-[3px] outline-offset-[-3px]"
        >
          Take a Photo
        </button>
        </div>
        <input
          type="file"
          accept="image/*"
          id="take-photo"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => document.getElementById("choose-gallery").click()}
          className="w-full h-[56px] bg-white text-black font-[800] rounded-[24px] shadow-md outline-[3px] outline-offset-[-3px]"
        >
          Choose from Gallery
        </button>
        <input
          type="file"
          accept="image/*"
          id="choose-gallery"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Next Button */}
      <button
        onClick={() => onNext({ profileImage })}
        disabled={!profileImage}
        className={`w-full mt-8 py-3 rounded-lg text-white font-[700] ${
          profileImage ? "bg-black hover:bg-gray-900" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}
