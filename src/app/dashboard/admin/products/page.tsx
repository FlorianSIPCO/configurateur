"use client"

import ButtonPrimary from '@/app/components/Buttons/ButtonPrimary'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UploadedImage } from '@/types'

type Product = {
  id: string;
  name: string;
  description?: string;
  priceFormula: string;
  images: UploadedImage[];
  createdAt: string;
}

export default function PageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Fonction get
  useEffect(() => {
    fetch("/api/products")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error("Erreur du chargement des produits :", err))
    .finally(() => setLoading(false));
  }, [])

  // Fonction delete
  const handleDelete = async () => {
    if (!selectedProductId) return;

    const res = await fetch(`/api/products/${selectedProductId}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter(product => product.id !== selectedProductId))
      setShowModal(false);
    }
  }
  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-700">Produits</h1>
        <Link href="/dashboard/admin/products/CreateOrEditProduct">
          <ButtonPrimary>Créer un produit</ButtonPrimary>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-300">Chargement des produits...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">Aucun produit pour l’instant.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative group bg-white text-gray-900 rounded-lg shadow overflow-hidden">
              {product.images[0] && (
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  width={400}
                  height={200}
                  className="object-contain w-full h-48"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
                <button
                  title="Voir"
                  onClick={() => router.push(`/dashboard/admin/products/${product.id}`)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-800"
                >
                  <Eye size={20} />
                </button>
                <button
                  title="Modifier"
                  onClick={() => router.push(`/dashboard/admin/products/${product.id}/edit`)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 text-gray-800"
                >
                  <Pencil size={20} />
                </button>
                <button
                  title="Supprimer"
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setShowModal(true);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 text-red-600"
                >
                  <Trash size={20} />
                </button>
              </div>

              {/* Contenu de la carte */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-amber-700 text-sm">Prix de base : {product.priceFormula}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de suppression */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}