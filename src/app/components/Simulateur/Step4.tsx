"use client";

import { useState } from "react";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import toast from "react-hot-toast";
import { SimulateurFormData } from "@/types";
import ButtonSecondary from "../Buttons/ButtonSecondary";

type Props = {
  data: SimulateurFormData;
  onChange: (field: keyof SimulateurFormData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function Step4({ data, onChange, onBack, onSubmit }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Vos coordonnées</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={data.firstname}
          onChange={(e) => onChange("firstname", e.target.value)}
          placeholder="Prénom *"
          className="border px-4 py-2 rounded"
        />
        <input
          value={data.lastname}
          onChange={(e) => onChange("lastname", e.target.value)}
          placeholder="Nom *"
          className="border px-4 py-2 rounded"
        />
        <input
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Email *"
          className="border px-4 py-2 rounded"
        />
        <input
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Téléphone"
          className="border px-4 py-2 rounded"
        />
      </div>

      <div className="flex justify-between mt-4">
        <ButtonSecondary type="button" onClick={onBack} className="text-red-700">
          Retour
        </ButtonSecondary>
        <ButtonPrimary
          type="button"
          className="bg-red-700 border-red-700 hover:text-red-700"
          onClick={() => {
            if (!data.firstname || !data.lastname || !data.email) {
              toast.error("Merci de remplir tous les champs obligatoires.");
              return;
            }
            onSubmit();
          }}
        >
          Envoyer
        </ButtonPrimary>
      </div>
    </div>
  );
}
