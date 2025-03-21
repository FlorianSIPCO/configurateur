"use client";
import { useConfigurator } from "@/context/ConfiguratorContext";

export default function PriceCalculator() {
  const { estimatedPrice } = useConfigurator();

  return (
    <div className="p-4 text-center">
      <h3 className="text-2xl font-bold text-gray-900">Prix estimé :</h3>
      <p className="text-3xl font-semibold text-amber-700 mt-2">{estimatedPrice} € / jour</p>
    </div>
  );
}
