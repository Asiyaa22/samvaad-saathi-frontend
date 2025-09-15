"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1 from "./step-1.jsx";
import Step2 from "./step-2.jsx";
import Step3 from "./step-3.jsx";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    degree: "",
    university: "",
    profilePic: null,
    targetRole: "",
    resume: null,
    experience: "",
  });
  const router = useRouter();

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (data) => {
    
    setFormData((prev) => ({ ...prev, ...data }));
    // TODO: send formData to backend if needed
    router.push("/home"); // navigate to home page
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <Step3 onNext={handleSubmit} onBack={handleBack} />}
    </div>
  );
}
