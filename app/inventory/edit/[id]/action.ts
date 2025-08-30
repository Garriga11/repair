'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateInventoryItem(id: string, formData: FormData) {
  await prisma.inventoryItem.update({
    where: { id },
    data: {
      // ...extract and parse fields from formData as in the add action...
    }
  });
  revalidatePath('/inventory');
}

export async function deleteInventoryItem(id: string) {
  await prisma.inventoryItem.delete({ where: { id } });
  revalidatePath('/inventory');
}