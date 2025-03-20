"use client";
import { useConfigurator } from "@/context/ConfiguratorContext";

export default function OptionSelector() {
  const { updateOption } = useConfigurator();

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-semibold mb-4">Personnalisez votre borne</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Couleur :</label>
          <select
            className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:ring focus:ring-blue-300"
            onChange={(e) => updateOption("Couleur", e.target.value)}
          >
            <option value="Noir">Noir</option>
            <option value="Blanc">Blanc</option>
            <option value="Gris">Gris</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Matériau :</label>
          <select
            className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:ring focus:ring-blue-300"
            onChange={(e) => updateOption("Matériau", e.target.value)}
          >
            <option value="Plastique">Plastique</option>
            <option value="Métal">Métal</option>
            <option value="Bois">Bois</option>
          </select>
        </div>
      </div>
    </div>
  );
}
