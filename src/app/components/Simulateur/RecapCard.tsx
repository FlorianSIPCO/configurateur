"use client";

import { SimulateurFormData } from "@/types";

type Props = {
  data: SimulateurFormData;
};

export default function RecapCard({ data }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg border w-full md:w-80">
      <h2 className="text-lg font-semibold mb-4 text-red-700">Résumé</h2>

      <ul className="space-y-2 text-sm text-gray-800">
        <li><strong>Produit :</strong> {data.productTypes.length > 0 ? data.productTypes.join(", ") : "–"}</li>
        <li><strong>Quantité :</strong> {data.quantity || "–"}</li>
        <li><strong>Matériau :</strong> {data.material || "–"}</li>
        <li><strong>Projet :</strong> {data.projectType || "–"}</li>
        <li><strong>Prix estimé :</strong> {"–"}</li>
      </ul>
    </div>
  );
}
