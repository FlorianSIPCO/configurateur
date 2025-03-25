"use client";

import { useState } from "react";
import { OptionType } from "@prisma/client";
import ButtonPrimary from "@/app/components/Buttons/ButtonPrimary";
import Image from "next/image";
import ImageUploader from "../../components/ImageUploader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type OptionValue = {
  name: string;
  image: string;
  miniature: string;
  price: number;
};

type Option = {
  name: string;
  type: OptionType;
  values: OptionValue[];
};

type UploadedImage = {
  url: string;
  public_id: string;
}

export default function CreateOrEditProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceFormula, setPriceFormula] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const router = useRouter();

  const handleAddOption = () => {
    setOptions([...options, { name: "", type: "CUSTOM", values: [] }]);
  };

  const handleOptionChange = (index: number, field: keyof Option, value: any) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const handleAddValue = (optionIndex: number) => {
    const updated = [...options];
    updated[optionIndex].values.push({
      name: "",
      image: "",
      miniature: "",
      price: 0,
    });
    setOptions(updated);
  };

  const handleValueChange = <K extends keyof OptionValue>(
    optionIndex: number,
    valueIndex: number,
    field: K,
    newValue: string
  ) => {
    const updated = [...options];
    let parsedValue: OptionValue[K];

    if (field === "price") {
      parsedValue = parseFloat(newValue) as OptionValue[K]; // Number
    } else {
      parsedValue = newValue as OptionValue[K]; // string
    }
    updated[optionIndex].values[valueIndex][field] = parsedValue;
    setOptions(updated);
  };

  const handleImageUpload = (
    optionIndex: number, 
    valueIndex: number, 
    field: "image" | "miniature", 
    images: UploadedImage[]
  ) => {
    const updated = [...options];
    updated[optionIndex].values[valueIndex][field] = images[0]?.url || "";
    setOptions(updated);
  };

  const handleImagesUpload = (uploaded: UploadedImage[]) => {
    setImages(uploaded);
  };

  const handleRemoveValue = (optionIndex: number, valueIndex: number) => {
    const updated = [...options];
    updated[optionIndex].values.splice(valueIndex, 1);
    setOptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, priceFormula, images, options }),
      });

      if (!res.ok) {
        toast.error("Erreur lors de la création du produit.");
        return;
      }

      toast.success("Produit créé avec succès !");
      router.push("/dashboard/admin/products");
    } catch (error) {
      console.error("Erreur création produit :", error);
      toast.error("Erreur serveur");
    }
  };

  const optionTypeLabels: Record<OptionType, string> = {
    COLOR: "Couleur",
    SIZE: "Taille",
    MATERIAL: "Matériau",
    CUSTOM: "Personnalisé",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-amber-700">Créer un produit</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Infos générales */}
        <div>
          <label className="block mb-1 font-semibold">Nom du produit</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-4 py-2 rounded" required />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Prix de base</label>
          <input type="text" value={priceFormula} onChange={(e) => setPriceFormula(e.target.value)} className="w-full border px-4 py-2 rounded" required />
        </div>

        {/* Images produit */}
        <div>
          <label className="block mb-2 font-semibold">Images du produit</label>
          <ImageUploader onUploadComplete={handleImagesUpload} />
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {images.map((image, index) => (
                <Image key={index} src={image.url} alt={`Image ${index + 1}`} width={300} height={200} className="rounded shadow" />
              ))}
            </div>
          )}
        </div>

        {/* Options dynamiques */}
        <div>
          <label className="block mb-2 font-semibold">Options de personnalisation</label>
          {options.map((opt, index) => (
            <div key={index} className="mb-6 p-4 rounded bg-gray-50 space-y-4 border">
              <select value={opt.type} onChange={(e) => handleOptionChange(index, "type", e.target.value as OptionType)} className="w-full border px-3 py-2 rounded">
                {Object.entries(optionTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Nom de l’option (ex: Texture, Couleur...)"
                value={opt.name}
                onChange={(e) => handleOptionChange(index, "name", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />

              {/* Valeurs de l’option */}
              {opt.values.map((val, valIndex) => (
                <div key={valIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={val.name}
                    onChange={(e) => handleValueChange(index, valIndex, "name", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />

                  {/* Upload image */}
                  <div>
                    <p className="text-sm mb-1">Image</p>
                    <ImageUploader onUploadComplete={(urls) => handleImageUpload(index, valIndex, "image", urls)} />
                    {val.image && <Image src={val.image} alt="image" width={60} height={60} className="rounded mt-2" />}
                  </div>

                  {/* Upload miniature */}
                  <div>
                    <p className="text-sm mb-1">Miniature</p>
                    <ImageUploader onUploadComplete={(urls) => handleImageUpload(index, valIndex, "miniature", urls)} />
                    {val.miniature && <Image src={val.miniature} alt="miniature" width={60} height={60} className="rounded mt-2" />}
                  </div>

                  {/* Prix */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Prix"
                      value={val.price}
                      onChange={(e) => handleValueChange(index, valIndex, "price", e.target.value)}
                      className="border px-3 py-2 rounded w-full"
                    />
                    <button type="button" onClick={() => handleRemoveValue(index, valIndex)} className="text-red-500 hover:underline text-sm">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}

              <ButtonPrimary type="button" onClick={() => handleAddValue(index)}>
                Ajouter une valeur
              </ButtonPrimary>
            </div>
          ))}

          <ButtonPrimary type="button" onClick={handleAddOption}>
            Ajouter une option
          </ButtonPrimary>
        </div>

        <ButtonPrimary type="submit">Enregistrer</ButtonPrimary>
      </form>
    </div>
  );
}
