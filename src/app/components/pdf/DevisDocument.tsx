import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  header: { marginBottom: 20, textAlign: "center" },
  logo: { width: 120, height: 40, marginBottom: 10, alignSelf: "center" },
  title: { fontSize: 20, marginBottom: 4 },
  date: { fontSize: 10, color: "gray" },
  section: { marginBottom: 12 },
  label: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  note: { marginTop: 20, fontSize: 10, color: "gray", textAlign: "justify" },
  footer: { fontSize: 10, textAlign: "center", marginTop: 40, borderTop: 1, paddingTop: 10 },
});

type Props = {
  userData: any;
  estimatedPrice: number;
};

const formatDate = (date = new Date()) => {
  return date.toLocaleDateString('fr-FR', {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) as string;
}

export default function DevisDocument({ userData, estimatedPrice }: Props) {
  const currentDate = formatDate();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête avec logo + date */}
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src="./images/logo.png" style={styles.logo} />
          <Text style={styles.title}>Devis personnalisé</Text>
          <Text style={styles.date}>Généré le {currentDate}</Text>
        </View>

         {/* Infos client */}
         <View style={styles.section}>
          <Text style={styles.label}>Informations du client :</Text>
          <View style={styles.row}>
            <Text>Nom :</Text>
            <Text>{userData.firstname} {userData.lastname}</Text>
          </View>
          <View style={styles.row}>
            <Text>Email :</Text>
            <Text>{userData.email}</Text>
          </View>
          {userData.phone && (
            <View style={styles.row}>
              <Text>Téléphone :</Text>
              <Text>{userData.phone}</Text>
            </View>
          )}
          {userData.company && (
            <View style={styles.row}>
              <Text>Entreprise :</Text>
              <Text>{userData.company}</Text>
            </View>
          )}
        </View>

        {/* Produit & Prix */}
        <View style={styles.section}>
          <Text style={styles.label}>Détails de la demande :</Text>
          <View style={styles.row}>
            <Text>Produit sélectionné :</Text>
            <Text>{userData.product || "Non renseigné"}</Text>
          </View>
          <View style={styles.row}>
            <Text>Prix estimé :</Text>
            <Text>{estimatedPrice} €</Text>
          </View>
        </View>

        {/* Note */}
        <Text style={styles.note}>
          Ce devis est une simulation à titre indicatif basée sur les informations que vous avez fournies.
          Un conseiller vous contactera prochainement pour valider votre projet et établir un devis définitif.
        </Text>

        {/* Footer */}
        <Text style={styles.footer}>
          Merci pour votre confiance. Ce document a été généré automatiquement par notre configurateur.
        </Text>
      </Page>
    </Document>
  );
}
