"use client";
import { useConfigurator } from "@/context/ConfiguratorContext";
import toast from "react-hot-toast";

export default function LeadForm() {
  const { selectedOptions, estimatedPrice } = useConfigurator();

  const handleSubmit = async () => {
    const response = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify({
        selectedOptions,
        estimatedPrice,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast.success("Devis envoyé !");
    } else {
      toast.error("Erreur lors de l'envoi du devis.");
    }
  };

  return (
    <div className="p-4 text-center">
      <button
        className="px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
        onClick={handleSubmit}
      >
        Obtenir mon devis
      </button>
    </div>
  );
}
