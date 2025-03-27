import { SimulateurFormData } from "@/types";
import ButtonPrimary from "../Buttons/ButtonPrimary";

type Props = {
  data: SimulateurFormData;
  onChange: (field: keyof SimulateurFormData, value: string[]) => void;
  onNext: () => void;
};

export default function Step1({ data, onChange, onNext }: Props) {
  const productTypes = ["Fenêtres", "Portes-fenêtres", "Portes d’entrée", "Volets", "Portails"];

  const toggleProduct = (product: string) => {
    const updated = data.productTypes.includes(product)
    ? data.productTypes.filter((p) => p !== product)
    : [...data.productTypes, product];

    onChange('productTypes', updated)
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">Quel type de produit ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => toggleProduct(type)}
            className={`p-4 border rounded-lg ${
              data.productTypes.includes(type) ? "bg-red-700 text-white" : "bg-white text-gray-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <ButtonPrimary
          onClick={onNext}
          disabled={data.productTypes.length === 0}
          className="bg-red-700 border-red-700 hover:text-red-700 text-white px-6 py-2 rounded disabled:opacity-50"
          type="button"
        >
          Suivant
        </ButtonPrimary>
      </div>
    </div>
  );
}
