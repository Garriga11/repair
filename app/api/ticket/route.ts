// app/api/tickets/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "USER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { device, deviceSN, location, accountId, description } = await request.json();

  const ticket = await prisma.ticket.create({
    data: {
      device,
      deviceSN,
      location,
      accountId,
      description,
      status: "OPEN",
      userId: session.user.id,
    },
  });

  return NextResponse.json(ticket);
}
