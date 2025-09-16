"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const userName = "Saniyya"; // TODO: replace with dynamic user from backend

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4 relative">
        <h2 className="prose lg:prose-2xl font-bold">Hi {userName}</h2>

        <Image
          width={50}
          height={50}
          src={`https://avatar.iran.liara.run/username?username=${userName?.replaceAll(
            " ",
            "-"
          )}`}
          alt="user avatar"
        />
      </div>

      <div className="flex items-center justify-center flex-col gap-20">
        <Image src="/home.png" alt="home image" height={300} width={300} />
      </div>

      <div className="absolute inset-x-0 bottom-20 px-6">
        <Link href="interview-start">
          <button className="w-full bg-black text-white font-bold font-xl p-4 rounded-xl">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
