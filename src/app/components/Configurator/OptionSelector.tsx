"use client";
import { useConfigurator } from "@/context/ConfiguratorContext";
import { useEffect, useState } from "react";
import Image from "next/image";

type ColorOption = {
  name: string;
  image: string;
  miniature: string;
  price: number;
}

type TextureOption = {
  name: string;
  colors: ColorOption[];
}

export default function OptionSelector() {
  const { updateColor, updateTexture } = useConfigurator();
  const [textures, setTextures] = useState<any[]>([]);
  const [selectedTexture, setSelectedTexture] = useState<string>("Bois");
  const [selectedColor, setSelectedColor] = useState<string>("Bois Clair");
  const [optionPrice, setOptionPrice] = useState<number>(0);

  // Charger les options depuis le JSON
  useEffect(() => {
    fetch("/data/options.json")
      .then((res) => res.json())
      .then((data) => {
        setTextures(data.textures);
        // Initialiser avec le prix de la première couleur Bois clair
        const firstColor = data.textures.find((t: TextureOption) => t.name === "Bois")?.colors[0];
        setOptionPrice(firstColor?.price || 0);
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
  }, []);

  // Récupérer les couleurs associées à la texture sélectionnée
  const colors = textures.find((t) => t.name === selectedTexture)?.colors || [];

  const handleTextureChange = (texture: TextureOption) => {
    setSelectedTexture(texture.name);
    const defaultColor = texture.colors[0];
    setSelectedColor(defaultColor.name);
    setOptionPrice(defaultColor.price);
    updateTexture(texture.name);
    updateColor(defaultColor.image, defaultColor.price);
  };

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color.name);
    setOptionPrice(color.price);
    updateColor(color.image, color.price);
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Personnalisation</h2>
        <span className="text-sm font-medium text-gray-500">
          {optionPrice > 0 ? `+${optionPrice} €` : "Inclus"}
        </span>
      </div>

      {/* Sélection de la texture */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Texture</h3>
        <div className="flex gap-2 mt-2">
          {textures.map((texture: TextureOption) => (
            <button
              key={texture.name}
              onClick={() => handleTextureChange(texture)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedTexture === texture.name ? "bg-amber-700 text-white border-amber-800" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {texture.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sélection de la couleur (Dynamique selon la texture) */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Couleur</h3>
        <div className="flex gap-4 mt-4">
          {colors.map((color: ColorOption) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color)}
              className={`relative w-12 h-12 rounded-full border-2 overflow-hidden transition ${
                selectedColor === color.name ? "border-amber-700 shadow-md" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Image 
                src={color.miniature}
                alt={color.name}
                width={48}
                height={48}
                className='absolute inset-0 w-full h-full object-cover'
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
