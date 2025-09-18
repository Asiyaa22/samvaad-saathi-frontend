"use client";

import {
  AcademicCapIcon,
  ArrowLeftStartOnRectangleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="pt-20 pb-8 max-w-md mx-auto">
      {/* Card */}
      <section className="">
        {/* Avatar */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-20 h-20 rounded-full ring-4 ring-white/80 overflow-hidden shadow-md">
            <Image
              src="https://avatar.iran.liara.run/public"
              alt="User avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <h2 className=" text-2xl font-semibold">Emma Phillips</h2>
          <p className="text-sm font-medium">React Developer</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 px-6 py-4 border-y border-white/10 bg-white/5">
          <div>
            <p className="text-xs">Interviews attempted</p>
            <p className=" text-2xl font-semibold mt-1">20</p>
          </div>
          <div className="text-right">
            <p className="text-xs">Highest Score</p>
            <p className=" text-2xl font-semibold mt-1">85%</p>
          </div>
        </div>

        {/* Actions */}
        <ul className="divide-y divide-white/10">
          <li>
            <button className="w-full flex items-center gap-3 px-6 py-4 text-left  hover:bg-white/5">
              <DocumentTextIcon className="size-6 text-[#1F285B]" />{" "}
              <span>Resume</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-6 py-4 text-left  hover:bg-white/5">
              <AcademicCapIcon className="size-6 text-[#1F285B]" />
              <span>University</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-3 px-6 py-4 text-left text-red-400 hover:bg-white/5">
              <ArrowLeftStartOnRectangleIcon className="size-6" />
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </section>
    </main>
  );
}
