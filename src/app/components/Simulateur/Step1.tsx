import { SimulateurFormData } from "@/types";

type Props = {
  data: SimulateurFormData;
  onChange: (field: keyof SimulateurFormData, value: string) => void;
  onNext: () => void;
};

export default function Step1({ data, onChange, onNext }: Props) {
  const productTypes = ["Fenêtres", "Portes-fenêtres", "Portes d’entrée", "Volets", "Portails"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quel type de produit ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => onChange("productType", type)}
            className={`p-4 border rounded-lg ${
              data.productType === type ? "bg-red-700 text-white" : "bg-white text-gray-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!data.productType}
        className="bg-red-700 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
}
