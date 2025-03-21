import DevisAction from "@/app/components/pdf/DevisAction";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

type Props = {
    params: { id: string }
}

export default async function DevisPage({ params }: Props) {
  const { id } = params;

  const lead = await prisma.lead.findUnique({
    where: { id },
  });

  if (!lead) return notFound();

  const user = lead.userData as any;

  return (
    <div className="min-h-screen py-12 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Votre devis personnalisé</h1>
        <p className="text-gray-600 mb-6">Merci {user.firstname}, voici le récapitulatif de votre demande :</p>

        <ul className="mb-6 space-y-2">
          <li><strong>Nom :</strong> {user.firstname} {user.lastname}</li>
          <li><strong>Email :</strong> {user.email}</li>
          {user.phone && <li><strong>Téléphone :</strong> {user.phone}</li>}
          {user.company && <li><strong>Entreprise :</strong> {user.company}</li>}
          <li><strong>Produit :</strong> {user.product}</li>
          <li><strong>Prix estimé :</strong> {lead.priceEstimate} €</li>
        </ul>
        <DevisAction userData={user} estimatedPrice={lead.priceEstimate} />
      </div>
    </div>
  );
}
