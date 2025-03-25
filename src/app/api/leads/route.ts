import { NextResponse, NextRequest} from "next/server";
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
      options,
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
      options
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const skip = (page - 1) * pageSize;

    const leads = await prisma.lead.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.lead.count();

    return NextResponse.json({ leads, total });
  } catch (error) {
    console.error("Erreur récupération leads :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}