import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      priceFormula,
      images,
      options,
    } = body;

    if (!name || !priceFormula || !images?.length) {
      return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
    }

    const imageUrls = images.map((img: { url: string }) => img.url)

    const createdProduct = await prisma.product.create({
      data: {
        name,
        description,
        priceFormula,
        images: imageUrls,
        options: {
          create: options.map((opt: any) => ({
            name: opt.name,
            type: opt.type,
            values: opt.values,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    return NextResponse.json({ success: true, product: createdProduct }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc"},
      include: {
        options: true,
      }
    })

    // Adapter les images au format { url, public_id }
    const formattedProducts = products.map((product) => {
      const images = Array.isArray(product.images)
        ? product.images.map((img: any) => {
            if (typeof img === "string") {
              return { url: img, public_id: "" };
            }
            return img; // déjà bien formaté
          })
        : [];

      return {
        ...product,
        images,
      };
    });

    return NextResponse.json(formattedProducts);

  } catch (error) {
    console.error("Erreur API GET /products :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}