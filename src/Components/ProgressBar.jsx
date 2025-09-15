import Image from "next/image";

export default function ProgressBar({ step }) {
  const steps = [
    { label: "Education", icon: "/step1.png" },
    { label: "Profile", icon: "/step2.png" },
    { label: "Role", icon: "/step3.png" },
  ];

  return (
    <div className="relative w-full flex justify-between items-center px-4 mt-8 mb-12">
      {/* Step Circles with Icons */}
      {steps.map((s, idx) => (
        <div key={idx} className="flex flex-col items-center z-10 relative">
          <div
            className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${
              step >= idx + 1 ? "bg-blue-500" : "bg-white border-2 border-gray-300"
            }`}
          >
            <Image src={s.icon} width={16} height={16} alt={s.label} className="object-contain" />
          </div>
          <div className="mt-2 text-[8px] font-noto font-semibold text-center text-black">
            Step {idx + 1}:<br />
            {s.label}
          </div>
          {/* Connecting line except for last step */}
          {idx < steps.length - 1 && (
            <div
              className={`absolute top-1/2 left-[100%] -translate-y-1/2 w-[calc(100%/3-28px/2)] h-[2px] ${
                step > idx + 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
