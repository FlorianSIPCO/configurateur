"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  userData: {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    company?: string;
    product?: string;
  };
  priceEstimate: number;
  createdAt: string;
};

export default function PageClients() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Liste des leads</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gray-700 text-left text-sm uppercase text-gray-400">
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Téléphone</th>
                <th className="px-6 py-3">Entreprise</th>
                <th className="px-6 py-3">Produit</th>
                <th className="px-6 py-3">Prix estimé</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="px-6 py-4">{lead.userData.firstname} {lead.userData.lastname}</td>
                  <td className="px-6 py-4">{lead.userData.email}</td>
                  <td className="px-6 py-4">{lead.userData.phone || "-"}</td>
                  <td className="px-6 py-4">{lead.userData.company || "-"}</td>
                  <td className="px-6 py-4">{lead.userData.product || "-"}</td>
                  <td className="px-6 py-4">{lead.priceEstimate} €</td>
                  <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
