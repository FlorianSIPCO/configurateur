"use client";
import { useConfigurator } from "@/context/ConfiguratorContext";
import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  images: string[];
}

export default function ProductSelector() {
  const { setProduct, selectedProduct } = useConfigurator();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Choisissez votre modèle</h2>
        <span className="text-sm font-medium text-gray-500">Inclus</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setProduct(product.id, product.images[0])}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow-md transition ${
              selectedProduct === product.id ? "border-amber-700 shadow-lg" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <Image
              src={product.images[0]} 
              alt={product.name} 
              width={80}
              height={80}
              className="mb-2" />
            <span className="text-lg font-medium">{product.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
