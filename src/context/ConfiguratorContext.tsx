"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ConfiguratorContextType = {
  selectedProduct: string | null;
  selectedOptions: Record<string, string>;
  estimatedPrice: number;
  selectedColorPrice: number;
  updateOption: (optionName: string, value: string) => void;
  setProduct: (product: string, image: string) => void;
  productImage: string;
  updateTexture: (texture: string) => void;
  updateColor: (image: string, price: number) => void;
};

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
  const basePrice = 150; // ✅ Prix de base du modèle

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [productImage, setProductImage] = useState<string>("/images/bois-clair.png");
  const [estimatedPrice, setEstimatedPrice] = useState<number>(basePrice);
  const [selectedColorPrice, setSelectedColorPrice] = useState<number>(0);

  const updateOption = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const updateTexture = (texture: string) => {
    console.log(`Texture sélectionnée : ${texture}`);
  };

  const updateColor = (image: string, price: number) => {
    setProductImage(image);
    setSelectedColorPrice(price);
  };

  const setProduct = (product: string, image: string) => {
    setSelectedProduct(product);
    setProductImage(image);
  };

  // ✅ Recalcul du prix dès que le prix de couleur change
  useEffect(() => {
    setEstimatedPrice(basePrice + selectedColorPrice);
  }, [selectedColorPrice]);

  return (
    <ConfiguratorContext.Provider
      value={{
        selectedProduct,
        selectedOptions,
        estimatedPrice,
        selectedColorPrice,
        updateOption,
        setProduct,
        productImage,
        updateColor,
        updateTexture
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error("useConfigurator doit être utilisé à l'intérieur de ConfiguratorProvider");
  }
  return context;
};
