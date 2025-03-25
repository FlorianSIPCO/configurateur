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

    const createdProduct = await prisma.product.create({
      data: {
        name,
        description,
        priceFormula,
        images,
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

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur API GET /products :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}