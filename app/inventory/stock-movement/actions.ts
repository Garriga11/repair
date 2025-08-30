"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


import type { StockMovementType } from '@prisma/client';

export async function addStockMovement(formData: FormData) {
  const inventoryId = formData.get('inventoryId') as string;
  const type = formData.get('type') as StockMovementType;
  const quantity = Number(formData.get('quantity'));
  const reason = formData.get('reason') as string;
  const reference = formData.get('reference') as string;

  // Optionally: get userId from session if needed

  await prisma.stockMovement.create({
    data: {
      inventoryId,
  type,
      quantity,
      reason,
      reference,
      // userId: ...,
    }
  });

  // Update inventory quantity
  const inventoryItem = await prisma.inventoryItem.findUnique({ where: { id: inventoryId } });
  if (inventoryItem) {
    const newQuantity = type === 'STOCK_IN'
      ? inventoryItem.quantity + quantity
      : Math.max(0, inventoryItem.quantity - quantity);

    await prisma.inventoryItem.update({
      where: { id: inventoryId },
      data: {
        quantity: newQuantity,
        needsReorder: newQuantity <= inventoryItem.reorderLevel,
        updatedAt: new Date()
      }
    });
  }

  revalidatePath('/inventory/stock-movement');
}
