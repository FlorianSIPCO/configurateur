"use client";

import ProductSelector from "../components/Configurator/ProductSelector";
import OptionSelector from "../components/Configurator/OptionSelector";
import PriceCalculator from "../components/Configurator/PriceCalculator";
import LeadForm from "../components/Configurator/LeadForm";
import { ConfiguratorProvider, useConfigurator } from "@/context/ConfiguratorContext";
import Image from "next/image";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import { useState } from "react";

export default function ConfiguratorPage() {
  return (
    <ConfiguratorProvider>
      <ConfiguratorContent />
    </ConfiguratorProvider>
  )
}

// Nouveau composant pour éviter d'appeler useConfigurator() dans un Server Component
function ConfiguratorContent() {
  const { productImage } = useConfigurator();
  const [step, setStep] = useState(1);

  return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center py-10">
        
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Personnalisez votre borne d'affichage<br />obtenez un devis instantané
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8 max-w-3xl">
          Configurez votre borne en quelques clics 
        </p>

        {/* Contenu Principal */}
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Aperçu de la borne */}
          <div className="relative flex items-center justify-center">
            <Image
              src={productImage}
              alt="Aperçu de la borne"
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Sélection des options */}
          {step === 1 ? (
            <div className="space-y-6">
            <ProductSelector />
            <OptionSelector />
            <PriceCalculator />
            <div className="flex justify-center">
              <ButtonPrimary onClick={() => setStep(2)}>Continuer</ButtonPrimary>
            </div>
          </div>) : (
            <LeadForm onBack={() => setStep(1)} />
            )
          }
        </div>
      </div>
  );
}
