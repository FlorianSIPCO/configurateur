"use client";
import { useConfigurator } from "@/context/ConfiguratorContext";

export default function ProductSelector() {
  const { setProduct, selectedProduct } = useConfigurator();

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-semibold mb-4">Choisissez votre produit</h2>
      <div className="flex gap-4">
        <button
          className={`px-6 py-2 rounded-md transition ${
            selectedProduct === "Borne Standard" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setProduct("Borne Standard")}
        >
          Borne Standard
        </button>
        <button
          className={`px-6 py-2 rounded-md transition ${
            selectedProduct === "Borne Premium" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setProduct("Borne Premium")}
        >
          Borne Premium
        </button>
      </div>
    </div>
  );
}
