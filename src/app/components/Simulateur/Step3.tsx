"use client";

import { SimulateurFormData } from "@/types";
import ButtonSecondary from "../Buttons/ButtonSecondary";
import ButtonPrimary from "../Buttons/ButtonPrimary";

type Props = {
  data: SimulateurFormData;
  onChange: (field: keyof SimulateurFormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function Step3({ data, onChange, onNext, onBack }: Props) {
  const options = ["Rénovation", "Construction neuve"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quel est votre type de projet ?</h2>

      <div className="flex flex-col gap-4 mb-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange("projectType", option)}
            className={`p-4 rounded border text-left transition ${
              data.projectType === option ? "bg-red-700 text-white" : "bg-white text-gray-800"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <ButtonSecondary onClick={onBack} className="text-red-700">
          Précédent
        </ButtonSecondary>
        <ButtonPrimary
          onClick={onNext}
          disabled={!data.projectType}
          className="bg-red-700 border-red-700 text-white px-6 py-2 rounded disabled:opacity-50 hover:bg-white hover:text-red-700"
        >
          Suivant
        </ButtonPrimary>
      </div>
    </div>
  );
}
