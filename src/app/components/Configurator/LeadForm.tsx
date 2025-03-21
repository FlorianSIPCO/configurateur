"use client";
import { useState } from "react";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import ButtonSecondary from "../Buttons/ButtonSecondary";
import { useConfigurator } from "@/context/ConfiguratorContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type LeadFormProps = {
  onBack: () => void;
};

export default function LeadForm({ onBack }: LeadFormProps) {
  const { estimatedPrice, selectedProduct } = useConfigurator();
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const leadData = {
      ...form,
      product: selectedProduct,
      estimatedPrice,
      configuratorId: "demo-configurator-id" // à remplacer dynamiquement
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Votre demande a bien été envoyée.")
        router.push(`/devis/${data.lead.id}`);
      } else {
        toast.error("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Informations personnelles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
          placeholder="Prénom"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
          placeholder="Nom"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
      </div>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Téléphone (facultatif)"
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Entreprise (facultatif)"
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Précisez votre demande..."
        rows={4}
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      <div className="flex justify-between">
        <ButtonSecondary onClick={onBack}>Retour</ButtonSecondary>
        <ButtonPrimary type="submit">Envoyer le devis</ButtonPrimary>
      </div>
    </form>
  );
}
