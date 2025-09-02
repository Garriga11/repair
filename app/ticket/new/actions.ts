'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth'; // next-auth config (app/auth.ts or similar)
import { z } from 'zod';

// Validation schema with Zod
const ticketSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  device: z.string().min(1),
  deviceSN: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  ticketBalance: z.string(),
  status: z.string(),
});

export async function createSimpleTicketAction(input: unknown) {
  // ✅ Check auth (requires NextAuth Credentials provider configured)
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    // ✅ Validate input
    const data = ticketSchema.parse(input);

    // ✅ Save to Prisma
    const ticket = await prisma.ticket.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        device: data.device,
        deviceSN: data.deviceSN,
        description: data.description,
        location: data.location,
        ticketBalance: data.ticketBalance,
        status: {
          connect: { name: data.status }, // assuming Status is a related model
        },
        createdBy: {
          connect: { id: session.user.id }, // requires `id` on session.user
        },
      },
    });

    return { success: true, ticketId: ticket.id };
  } catch (err: any) {
    console.error('Ticket create failed:', err);
    return { success: false, error: err.message ?? 'Unknown error' };
  }
}
