"use client";

import { useEffect, useState } from "react";
import { Trash, Eye} from "lucide-react";
import toast from "react-hot-toast";

type Lead = {
  id: string;
  userData: {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    company?: string;
    product?: string;
    options?: Record<string, string>;
    message?: string;
  };
  priceEstimate: number;
  createdAt: string;
};

export default function PageClients() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leads?page=${page}&pageSize=${pageSize}`)
    .then((res) => res.json())
    .then(({ leads, total}) => {
      setLeads(leads);
      setTotalLeads(total);
    })
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
  }, [page]);
  
  // Pagination
  const pageSize = 10;
  const totalPages = Math.ceil(totalLeads / pageSize);

  return (
    <div className="text-white flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-amber-700 flex justify-center md:justify-start">Liste des leads</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="overflow-x-auto grow">
          <table className="min-w-full bg-white text-amber-700 rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-amber-700 text-left text-sm uppercase text-white">
                <th className="px-6 py-3">Entreprise</th>
                <th className="px-6 py-3">Produit</th>
                <th className="px-6 py-3">Options</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Prénom</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Téléphone</th>
                <th className="px-6 py-3">Prix estimé</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-amber-700 hover:bg-amber-600 hover:text-white transition">
                  <td className="px-6 py-4">{lead.userData.company || "-"}</td>
                  <td className="px-6 py-4">{lead.userData.product || "-"}</td>
                  {/* Options */}
                  <td className="px-6 py-4">
                    {lead.userData.options && Object.keys(lead.userData.options).length > 0 ? (
                      <ul className="space-y-1">
                        {Object.entries(lead.userData.options).map(([key, value]) => (
                          <li key={key} className="text-sm">
                            <span className="font-medium">{key}</span> : {String(value)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "-"
                    )}
                  </td>
                  {/* Message */}
                  <td className="px-6 py-4">
                    {lead.userData.message ? (
                      <button
                        onClick={() => {
                          setSelectedMessage(lead.userData.message ?? "");
                          setShowMessageModal(true);
                        }}
                        className="text-amber-700 hover:text-white flex justify-center text-center m-auto"
                        title="Voir le message"
                      >
                        <Eye size={20} />
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4">{lead.userData.lastname}</td>
                  <td className="px-6 py-4">{lead.userData.firstname}</td>
                  <td className="px-6 py-4">{lead.userData.email}</td>
                  <td className="px-6 py-4">{lead.userData.phone || "-"}</td>
                  <td className="px-6 py-4 flex justify-center text-center m-auto">{lead.priceEstimate} €</td>
                  <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {setSelectedLeadId(lead.id); setShowModal(true)}}
                      className="text-red-600 hover:text-red-800 transition flex justify-center text-center m-auto"
                      title="Supprimer le lead"
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* pagination */}
      <div className="flex justify-between items-center mb-12 py-4">
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-300" : "bg-amber-700 text-white hover:bg-amber-600"}`}
        >
          Précédent
        </button>
        <span className="text-gray-400">Page {page} / {totalPages}</span>
        <button 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg ${page === totalPages ? "bg-gray-300" : "bg-amber-700 text-white hover:bg-amber-600"}`}
        >
          Suivant
        </button>
      </div>

      {/* Modal message */}
      {showMessageModal && selectedMessage && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold">Message du client</h2>
          <p className="whitespace-pre-line">{selectedMessage}</p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800"
              onClick={() => {
                setShowMessageModal(false);
                setSelectedMessage(null);
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Modal confirmation delete */}
    {showModal && selectedLeadId && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm  flex items-center justify-center z-50">
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold">Confirmer la suppression</h2>
          <p>Souhaitez-vous vraiment supprimer ce lead ? Cette action est irréversible.</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={async () => {
                try {
                  const res = await fetch(`/api/leads/${selectedLeadId}`, { method: "DELETE" });
                  if (res.ok) {
                    toast.success("Lead supprimé avec succès.")
                    setLeads((prev) => prev.filter((lead) => lead.id !== selectedLeadId));
                  } else {
                    toast.error("Erreur lors de la suppression.")
                  }
                } catch (error) {
                  toast.error('Erreur réseau.');
                  console.error(error)
                } finally {                    
                  setShowModal(false);
                  setSelectedLeadId(null);
                }
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
