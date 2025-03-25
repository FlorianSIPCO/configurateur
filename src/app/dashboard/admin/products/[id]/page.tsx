"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type UploadedImage = {
  url: string;
  public_id: string;
};

type OptionValue = {
  name: string;
  image: UploadedImage;
  miniature: UploadedImage;
  price: number;
};

type Option = {
  name: string;
  type: string;
  values: OptionValue[];
};

type Product = {
  id: string;
  name: string;
  description?: string;
  priceFormula: string;
  images: UploadedImage[];
  options: Option[];
  createdAt: string;
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Erreur chargement produit :", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-300 p-6">Chargement...</p>;
  if (!product) return <p className="text-gray-400 p-6">Produit introuvable</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-amber-700 mb-4">{product.name}</h1>

      {product.description && (
        <p className="text-gray-400 mb-4 max-w-2xl">{product.description}</p>
      )}

      {/* Images du produit */}
      {product.images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {product.images.map((image, idx) => (
            <Image
              key={idx}
              src={image.url}
              alt={`Image ${idx + 1}`}
              width={300}
              height={200}
              className="rounded shadow object-contain bg-white"
            />
          ))}
        </div>
      )}

      {/* Prix */}
      <p className="text-lg text-amber-500 font-semibold mb-6">
        Prix de base : {product.priceFormula}
      </p>

      {/* Options */}
      {product.options?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-amber-700">Options</h2>
          {product.options.map((opt, index) => (
            <div key={index} className="bg-white text-gray-900 p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">{opt.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {opt.values.map((value, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-gray-50 p-3 rounded border"
                  >
                    <Image
                      src={value.miniature?.url}
                      alt={value.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover mb-2"
                    />
                    <p className="font-medium">{value.name}</p>
                    <p className="text-sm text-gray-600">{value.price > 0 ? `+${value.price} €` : "Inclus"}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
