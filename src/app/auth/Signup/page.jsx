
import Link from "next/link";
import GoogleSignupButton from "@/components/GoogleSignupButton";

export default function SignupPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-b from-[#7379eb94] via-[#171930] via-85% to-black px-4">
      {/* Logo */}
      <img
        src="/barabari_logo.png"
        alt="Samvaad Saathi Logo"
        className="w-[116px] h-[110px] mb-6"
      />

      {/* Welcome Text */}
      <h2 className="font-noto text-white text-[32px] font-[600] text-center mb-2">
        Welcome to Samvaad Saathi!
      </h2>

      {/* Page Heading */}
      <h1 className="font-noto text-white text-[20px] font-[600] mb-8">
        Create Account
      </h1>

      {/* Google Signup */}
      <GoogleSignupButton />

      {/* Already have account */}
      <p className="font-noto mt-6 text-[12px] font-[700] text-white/80">
        Already have an account?{" "}
        <Link href="/login" className="text-white text-[12px] font-[700] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
