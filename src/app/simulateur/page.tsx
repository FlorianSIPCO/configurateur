"use client";

import { useState } from "react";
import Step1 from "../components/Simulateur/Step1";
import Step2 from "../components/Simulateur/Step2";
import Step3 from "../components/Simulateur/Step3";
import Step4 from "../components/Simulateur/Step4";
import toast from "react-hot-toast";
import Timeline from "../components/Simulateur/Timeline";
import RecapCard from "../components/Simulateur/RecapCard";

export default function SimulateurPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    productTypes: [],
    quantity: "",
    material: "",
    projectType: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          priceEstimate: 0, // calcul à ajouter plus tard si besoin
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Votre demande a bien été envoyée !");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du formulaire");
      console.error("Erreur survenue :", error);
    }
  };

  return (
    <div
        className="min-h-screen bg-cover bg-center px-4 py-8 relative"
        style={{ backgroundImage: "url('/images/fenetres.jpg')" }}
        >
        {/* Conteneur principal (formulaire + timeline) */}
        <div className="max-w-4xl mx-auto mt-40 rounded-lg bg-black/40 backdrop-blur-md p-6 z-10 relative">
            <Timeline currentStep={step} />

            {step === 1 && (
            <Step1 data={formData} onChange={handleChange} onNext={handleNext} />
            )}
            {step === 2 && (
            <Step2 data={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
            )}
            {step === 3 && (
            <Step3 data={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
            )}
            {step === 4 && (
            <Step4
                data={formData}
                onChange={handleChange}
                onBack={handleBack}
                onSubmit={handleSubmit}
            />
            )}
        </div>

        {/* Recap indépendant en fixed à droite */}
        <div className="hidden lg:block absolute top-70 right-12 w-80">
            <RecapCard data={formData} />
        </div>
    </div>

  );
}
