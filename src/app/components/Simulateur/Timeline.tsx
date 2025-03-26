"use client";

type Props = {
  currentStep: number;
};

const steps = ["Produit", "Besoins", "Projet", "Coordonnées"];

export default function Timeline({ currentStep }: Props) {
  return (
    <div className="relative px-4 mb-10">
      {/* Ligne de fond complète */}
      <div className="absolute top-[1rem] left-0 right-0 h-1 bg-gray-300 z-0 rounded" />

      {/* Ligne de progression */}
      <div
        className="absolute top-[1rem] left-0 h-1 bg-red-700 z-10 rounded transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      <div className="flex justify-between relative z-20">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;

          return (
            <div key={label} className="flex flex-col items-center w-full text-center">
              {/* Cercle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm mb-2
                  ${isCompleted
                    ? "bg-red-700 text-white"
                    : isActive
                    ? "bg-white border-2 border-red-700 text-red-700"
                    : "bg-gray-200 text-gray-500"}
                `}
              >
                {stepNum}
              </div>

              {/* Label */}
              <span
                className={`text-sm ${
                  isCompleted || isActive
                    ? "text-red-700 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
