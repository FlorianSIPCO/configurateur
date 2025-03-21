import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstname,
      lastname,
      email,
      phone,
      company,
      message,
      product,
      estimatedPrice
    } = body;

    if (!firstname || !lastname || !email || !estimatedPrice) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const userData = {
      firstname,
      lastname,
      email,
      phone,
      company,
      message,
      product,
    };

    const newLead = await prisma.lead.create({
      data: {
        userData,
        priceEstimate: estimatedPrice,
      },
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error("Erreur API /api/leads :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Erreur récupération leads :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}