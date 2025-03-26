// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     if (!Array.isArray(body)) {
//       return NextResponse.json({ error: "Le fichier doit contenir un tableau JSON." }, { status: 400 });
//     }

//     const insertedProducts = [];

//     for (const item of body) {
//       const { name, description, priceFormula } = item;

//       if (!name || !priceFormula) {
//         continue; // Skip invalid rows
//       }

//       const product = await prisma.product.create({
//         data: {
//           name,
//           description: description || "",
//           priceFormula,
//           images: [],       // Images à ajouter manuellement ensuite
//           options: [],      // Options à configurer plus tard
//         },
//       });

//       insertedProducts.push(product);
//     }

//     return NextResponse.json({ success: true, count: insertedProducts.length, products: insertedProducts });
//   } catch (error) {
//     console.error("Erreur lors de l'import CSV :", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }
