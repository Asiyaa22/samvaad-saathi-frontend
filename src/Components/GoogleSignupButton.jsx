"use client";
import Image from "next/image";

export default function GoogleSignupButton() {
  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleSignup}
      className="w-72 h-11 bg-white rounded-lg flex items-center justify-center gap-3 active:scale-95 transition shadow-md"
    >
      <Image
        src="/google.png"
        alt="Google"
        width={20}
        height={20}
      />
      <span className="text-black text-sm font-semibold">
        Continue with Google
      </span>
    </button>
  );
}
