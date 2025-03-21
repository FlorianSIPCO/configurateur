"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {setTimeout(() => setVisible(true), 100) }, [])
  return (
    <main className="bg-gray-50 text-gray-800 relative">

      {/* Hero Section */}
      <header 
        className="relative bg-cover bg-center h-screen flex items-center justify-center text-white text-center">
        <Image
            src="/images/bg.jpg"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          />
            <div 
              className={`bg-green-950 bg-opacity-50 backdrop-blur-lg p-8 rounded-xl shadow-xl max-w-2xl w-full relative z-10 transform transition-all duration-700 ease-out
              ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
          <h1 className="text-5xl font-bold mb-4">Configurateur de produits</h1>
          <p className="text-lg mb-6">
            Obtenir des leads n'a jamais été aussi simple !
          </p>
          <Link href="/configurator" className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Découvrez notre outil
          </Link>
        </div>
        </header>
    </main>
  );
}
