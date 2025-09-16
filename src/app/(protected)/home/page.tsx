"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const userName = "Saniyya"; // TODO: replace with dynamic user from backend

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Greeting Row */}
      <div className="flex justify-between items-center px-6 mt-6">
        <h1 className="text-[32px] font-[700] text-black font-inter">
          Hi {userName}!
        </h1>
        <img
          src="https://placehold.co/52x52"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src="/home.png"
          alt="Illustration"
          className="w-[318px] h-[245px] object-contain mx-auto"
        />
      </div>

      {/* Get Started Button */}
      <div className="px-6 mb-20">
        <button
          className="w-[377px] h-[56px] py-3 bg-black text-white font-[700] text-[16px] rounded-[10px] shadow-md"
          onClick={() => router.push("/interview")} // TODO: route as needed
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
