"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addInventoryItem(formData: FormData) {
  const data = {
    sku: formData.get('sku') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    deviceModel: formData.get('deviceModel') as string,
    quantity: Number(formData.get('quantity')),
    reorderLevel: Number(formData.get('reorderLevel')),
    cost: parseFloat(formData.get('cost') as string),
    sellPrice: formData.get('sellPrice') ? parseFloat(formData.get('sellPrice') as string) : null,
    location: formData.get('location') as string,
    binNumber: formData.get('binNumber') as string,
  };

  await prisma.inventoryItem.create({ data });
  revalidatePath('/inventory');
}
