"use client";

import ProductSelector from "../components/Configurator/ProductSelector";
import OptionSelector from "../components/Configurator/OptionSelector";
import PriceCalculator from "../components/Configurator/PriceCalculator";
import LeadForm from "../components/Configurator/LeadForm";
import { ConfiguratorProvider } from "@/context/ConfiguratorContext";

export default function ConfiguratorPage() {
  return (
    <ConfiguratorProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Configurateur de Borne</h1>
        <div className="w-full max-w-4xl bg-gray-400 shadow-md rounded-lg p-6 space-y-6">
          <ProductSelector />
          <OptionSelector />
          <PriceCalculator />
          <LeadForm />
        </div>
      </div>
    </ConfiguratorProvider>
  );
}
