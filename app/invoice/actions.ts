"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addInvoice(formData: FormData) {
  const data = {
    ticketId: formData.get('ticketId') as string,
    accountId: formData.get('accountId') as string,
    total: parseFloat(formData.get('total') as string),
    paidAmount: formData.get('paidAmount') ? parseFloat(formData.get('paidAmount') as string) : 0,
    dueAmount: parseFloat(formData.get('dueAmount') as string),
  };

  await prisma.invoice.create({ data });
  revalidatePath('/invoice');
}
