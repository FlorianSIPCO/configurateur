"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type ConfiguratorContextType = {
    selectedProduct: string | null;
    selectedOptions: Record<string, string>;
    estimatedPrice: number;
    updateOption: (optionName: string, value: string) => void;
    setProduct: (product: string) => void;
};

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

    const updateOption = (optionName: string, value: string) => {
        setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
        recalculatePrice();
    }

    const recalculatePrice = () => {
        let basePrice = 500; // Prix de base, à récupérer dynamiquement
        Object.values(selectedOptions).forEach(() => {
            basePrice += 50; // Chaque option ajout 50€ (à ajuster selon les règles)
        });
        setEstimatedPrice(basePrice);
    };

    return (
        <ConfiguratorContext.Provider value={{ selectedProduct, selectedOptions, estimatedPrice, updateOption, setProduct: setSelectedProduct }}>
            {children}
        </ConfiguratorContext.Provider>
    )
}

export const useConfigurator = () => {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error("useConfigurator doit être utilisé à l'intérieur de ConfiguratorProvider");
    }
    return context;
}