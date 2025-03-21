"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DevisDocument from "./DevisDocument";
import { useState } from "react";
import ButtonPrimary from "../Buttons/ButtonPrimary";

type Props = {
  userData: any;
  estimatedPrice: number;
};

export default function DevisAction({ userData, estimatedPrice }: Props) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      {showPreview && (
        <div className="border rounded-lg overflow-hidden shadow">
          <PDFViewer width="100%" height={500}>
            <DevisDocument userData={userData} estimatedPrice={estimatedPrice} />
          </PDFViewer>
        </div>
      )}

      <div className="flex gap-4">
        <ButtonPrimary
          onClick={() => setShowPreview((prev) => !prev)}
        >
          {showPreview ? "Masquer l’aperçu" : "Afficher l’aperçu"}
        </ButtonPrimary>

        <ButtonPrimary>
          <PDFDownloadLink
            document={<DevisDocument userData={userData} estimatedPrice={estimatedPrice} />}
            fileName={`devis-${userData.lastname || "client"}.pdf`}
          >
            {({ loading }) => (loading ? "Préparation du PDF..." : "Télécharger le PDF")}
          </PDFDownloadLink>
        </ButtonPrimary>
      </div>
    </div>
  );
}
