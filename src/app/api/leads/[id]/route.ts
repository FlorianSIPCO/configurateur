import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(_: Request, context: any) {
  try {
    await prisma.lead.delete(context.params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression lead :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
