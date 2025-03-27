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

export default function Step2({ data, onChange, onNext, onBack }: Props) {
  const quantities = ["1", "2", "3", "4", "5", "6+"];
  const materials = ["PVC", "Aluminium", "RFP", "Bois", "Ne sait pas"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Définition de vos besoins</h2>

      {/* Quantité souhaitée */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Quantité souhaitée</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {quantities.map((qty) => (
            <button
              key={qty}
              onClick={() => onChange("quantity", qty)}
              className={`p-3 rounded border text-center transition font-medium hover:bg-red-700 hover:text-white ${
                data.quantity === qty ? "bg-red-700 text-white font-bold" : "bg-white text-gray-800"
              }`}
            >
              {qty}
            </button>
          ))}
        </div>
      </div>

      {/* Type de matériau */}
      <div className="mb-6">
        <label className="block font-medium mb-2 text-white">Type de matériau</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {materials.map((mat) => (
            <button
              key={mat}
              onClick={() => onChange("material", mat)}
              className={`p-3 rounded border transition font-medium hover:bg-red-700 hover:text-white ${
                data.material === mat ? "bg-red-700 text-white font-bold" : "bg-white text-gray-800"
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <ButtonSecondary onClick={onBack} type="button" className="text-red-700">
          Précédent
        </ButtonSecondary>
        <ButtonPrimary
          onClick={onNext}
          type="button"
          disabled={!data.quantity || !data.material}
          className="bg-red-700 border-red-700 hover:text-red-700"
        >
          Suivant
        </ButtonPrimary>
      </div>
    </div>
  );
}
