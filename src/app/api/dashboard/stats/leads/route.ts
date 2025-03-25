import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { subDays, subMonths, subYears, format } from "date-fns";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "mois"; // default = mois

  const now = new Date();
  let startDate: Date;
  let groupByFormat: string;

  if (filter === "semaine") {
    startDate = subDays(now, 6);
    groupByFormat = "dd/MM";
  } else if (filter === "année") {
    startDate = subYears(now, 1);
    groupByFormat = "MMM yyyy";
  } else {
    // mois
    startDate = subMonths(now, 1);
    groupByFormat = "dd/MM";
  }

  const leads = await prisma.lead.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: now,
      },
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  const grouped: Record<string, number> = {};

  leads.forEach((lead) => {
    const date = format(new Date(lead.createdAt), groupByFormat);
    grouped[date] = (grouped[date] || 0) + 1;
  });

  const labels = Object.keys(grouped);
  const values = Object.values(grouped);

  return NextResponse.json({ labels, values });
}
