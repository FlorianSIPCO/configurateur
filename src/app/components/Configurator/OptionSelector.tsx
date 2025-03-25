"use client";

import { useConfigurator } from "@/context/ConfiguratorContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import { OptionValue } from "@/types";

type ProductOption = {
  name: string;
  type: string;
  values: OptionValue[];
};

export default function OptionSelector() {
  const { selectedProduct, updateOption, updateColor, updateTexture } = useConfigurator();
  const [materialOptions, setMaterialOptions] = useState<ProductOption[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<ProductOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<OptionValue | null>(null);

  // Chargement des options depuis l'API une fois que le produit est sélectionné
  useEffect(() => {
    if (!selectedProduct) return;

    fetch(`/api/products/${selectedProduct}`)
      .then((res) => res.json())
      .then((product) => {
        const materials = product.options?.filter((opt: ProductOption) => opt.type === "MATERIAL") || [];
        setMaterialOptions(materials);
      })
      .catch((err) => console.error("Erreur chargement des options :", err));
  }, [selectedProduct]);

  const handleMaterialSelect = (material: ProductOption) => {
    setSelectedMaterial(material);
    updateOption("Matériau", material.name);
    updateTexture(material.name);

    // Sélection automatique de la première couleur
    const defaultColor = material.values[0];
    setSelectedColor(defaultColor);
    updateOption("Couleur", defaultColor.name);
    updateColor(defaultColor.image?.url || "", defaultColor.price || 0);
  };

  const handleColorSelect = (color: OptionValue) => {
    setSelectedColor(color);
    updateOption("Couleur", color.name);
    updateColor(color.image?.url || "", color.price || 0);
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-semibold mb-4">Personnalisation</h2>

      {/* Étape 1 - Choix du matériau */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Matériau</h3>
        <div className="flex gap-4 mt-2 flex-wrap">
          {materialOptions.map((material) => (
            <button
              key={material.name}
              onClick={() => handleMaterialSelect(material)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedMaterial?.name === material.name
                  ? "bg-amber-700 text-white border-amber-800"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {material.name}
            </button>
          ))}
        </div>
      </div>

      {/* Étape 2 - Choix de la couleur */}
      {selectedMaterial && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Couleur</h3>
            {selectedColor?.price ? (
              <span className="text-sm text-gray-500">+{selectedColor.price} €</span>
            ) : (
              <span className="text-sm text-gray-500">Inclus</span>
            )}
          </div>

          <div className="flex gap-4 flex-wrap">
            {selectedMaterial.values.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`relative w-14 h-14 rounded-full border-2 overflow-hidden transition ${
                  selectedColor?.name === color.name ? "border-amber-700 shadow-md" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {color.miniature ? (
                  <Image
                    src={color.miniature?.url}
                    alt={color.name}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xs">{color.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
