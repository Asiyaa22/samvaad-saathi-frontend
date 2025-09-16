"use client";

import Dropdown from "@/components/DropDown";
import Link from "next/link";
import { useState } from "react";

export default function InterviewStartPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [useResume, setUseResume] = useState(false);

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-center text-[20px] font-bold leading-6">
          Select Your Interview
        </h2>
        <h2 className="text-center text-[20px] font-bold leading-6">
          Preferences
        </h2>
      </div>

      <div>
        <Dropdown
          label="Role"
          options={roles}
          value={selectedRole}
          onChange={setSelectedRole}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-[14px] font-noto font-[500] text-black">
          Difficulty Level
        </label>

        <div className="rounded-[12px] border border-black/10 overflow-hidden">
          {[
            { key: "easy", label: "Easy" },
            { key: "medium", label: "Medium" },
            { key: "hard", label: "Hard" },
          ].map((opt, idx, arr) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setDifficulty(opt.key)}
              className={`w-full flex items-center gap-3 px-4 h-[56px] text-left bg-white ${
                idx < arr.length - 1 ? "border-b border-black/10" : ""
              }`}
              aria-pressed={difficulty === opt.key}
            >
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full border ${
                  difficulty === opt.key ? "border-black" : "border-black/40"
                }`}
                aria-hidden
              >
                <span
                  className={`block w-2.5 h-2.5 rounded-full ${
                    difficulty === opt.key ? "bg-black" : "bg-transparent"
                  }`}
                />
              </span>
              <span className="text-[14px] text-black font-noto">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between">
          <label className="text-[14px] font-noto font-[500] text-black">
            Use Resume for Interview
          </label>

          <button
            type="button"
            onClick={() => setUseResume((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              useResume ? "bg-black" : "bg-black/20"
            }`}
            aria-pressed={useResume}
            aria-label="Toggle resume usage"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                useResume ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="pt-4">
        <Link href="interview">
          <button className="w-full bg-black text-white font-bold p-4 rounded-xl">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
