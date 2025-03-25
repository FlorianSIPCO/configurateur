"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import ImageUploader from "../../../components/ImageUploader";
import ButtonPrimary from "@/app/components/Buttons/ButtonPrimary";
import { OptionType } from "@prisma/client";

type UploadedImage = { url: string; public_id: string };

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

type Product = {
  name: string;
  description?: string;
  priceFormula: string;
  images: UploadedImage[];
  options: Option[];
};

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceFormula, setPriceFormula] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  // Charger les données du produit
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setName(data.name);
        setDescription(data.description || "");
        setPriceFormula(data.priceFormula);
        setImages(data.images || []);
        setOptions(data.options || []);
      })
      .catch((err) => console.error("Erreur chargement produit :", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          priceFormula,
          images,
          options,
        }),
      });

      if (!res.ok) {
        toast.error("Erreur lors de la mise à jour du produit.");
        return;
      }

      toast.success("Produit mis à jour !");
      router.push("/dashboard/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur.");
    }
  };

  const handleImagesUpload = (uploaded: UploadedImage[]) => {
    setImages(uploaded);
  };

  const handleOptionChange = (index: number, field: keyof Option, value: any) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    setOptions([...options, { name: "", type: "CUSTOM", values: [] }]);
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
    const parsedValue = field === "price" ? parseFloat(newValue) : newValue;
    updated[optionIndex].values[valueIndex][field] = parsedValue as OptionValue[K];
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

  const handleRemoveValue = (optionIndex: number, valueIndex: number) => {
    const updated = [...options];
    updated[optionIndex].values.splice(valueIndex, 1);
    setOptions(updated);
  };

  const optionTypeLabels: Record<OptionType, string> = {
    COLOR: "Couleur",
    SIZE: "Taille",
    MATERIAL: "Matériau",
    CUSTOM: "Personnalisé",
  };

  if (loading) return <p className="p-6 text-gray-400">Chargement...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-amber-700">Modifier le produit</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-semibold">Nom</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Prix de base</label>
          <input value={priceFormula} onChange={(e) => setPriceFormula(e.target.value)} className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Images</label>
          <ImageUploader onUploadComplete={handleImagesUpload} />
          {images.filter(Boolean).length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {images.filter(Boolean).map((img, i) => (
                <Image key={i} src={img.url} alt={`image-${i}`} width={300} height={200} className="rounded shadow" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune image</p>
          )}
        </div>

        {/* Options personnalisées */}
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
                placeholder="Nom de l’option"
                value={opt.name}
                onChange={(e) => handleOptionChange(index, "name", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />

              {opt.values.map((val, valIndex) => (
                <div key={valIndex} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={val.name}
                    onChange={(e) => handleValueChange(index, valIndex, "name", e.target.value)}
                    className="border px-3 py-2 rounded"
                  />
                  <div>
                    <p className="text-sm mb-1">Image</p>
                    <ImageUploader onUploadComplete={(urls) => handleImageUpload(index, valIndex, "image", urls)} />
                    {val.image && <Image src={val.image} alt="image" width={60} height={60} className="rounded mt-2" />}
                  </div>
                  <div>
                    <p className="text-sm mb-1">Miniature</p>
                    <ImageUploader onUploadComplete={(urls) => handleImageUpload(index, valIndex, "miniature", urls)} />
                    {val.miniature && <Image src={val.miniature} alt="miniature" width={60} height={60} className="rounded mt-2" />}
                  </div>
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

        <ButtonPrimary type="submit">Mettre à jour</ButtonPrimary>
      </form>
    </div>
  );
}
