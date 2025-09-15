"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const userName = "Saniyya"; // TODO: replace with dynamic user from backend

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Top Bar */}
      <div className="w-full h-16 bg-[#1F285B] flex justify-end items-center px-4">
        {/* Settings Button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full"
          onClick={() => router.push("/settings")}
        >
            <Image src="/settings.png" alt="Settings" width={20} height={20} />
        </button>
      </div>

      {/* Greeting Row */}
      <div className="flex justify-between items-center px-6 mt-6">
        <h1 className="text-[32px] font-[700] text-black font-inter">Hi {userName}!</h1>
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

      {/* Bottom Menu Bar */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-[#1F285B] rounded-t-[14px] flex justify-around items-center">
        
        {/* History */}
        <button
          className="flex flex-col items-center"
          onClick={() => router.push("/history")}
        >
          <Image src="/history-icon.png" alt="History" width={28} height={28} />
          {/* <span className="text-xs mt-1 text-black">History</span> */}
        </button>

        {/* Home */}
        <button
          className="flex flex-col items-center"
          onClick={() => router.push("/home")}
        >
          <Image src="/home-icon.png" alt="Home" width={28} height={28} />
          {/* <span className="text-xs mt-1 text-black">Home</span> */}
        </button>

        {/* Profile */}
        <button
          className="flex flex-col items-center"
          onClick={() => router.push("/profile")}
        >
          <Image src="/user-icon.png" alt="Profile" width={28} height={28} />
          {/* <span className="text-xs mt-1 text-black">Profile</span> */}
        </button>
      </div>
    </div>
  );
}
