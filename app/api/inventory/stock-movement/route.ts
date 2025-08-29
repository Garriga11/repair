import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await request.json();
  const { inventoryId, type, quantity, reason, reference } = data;

  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { id: inventoryId }
  });

  if (!inventoryItem) return NextResponse.json({ error: 'Inventory item not found' }, { status: 404 });

  const newQuantity = Math.max(0, inventoryItem.quantity + quantity);
  if (newQuantity < 0) {
    return NextResponse.json({ error: 'Insufficient stock. Cannot reduce below 0.' }, { status: 400 });
  }

  const stockMovement = await prisma.stockMovement.create({
    data: {
      inventoryId,
      type,
      quantity,
      reason,
      reference,
      userId: session.user.id
    }
  });

  const updatedItem = await prisma.inventoryItem.update({
    where: { id: inventoryId },
    data: {
      quantity: newQuantity,
      needsReorder: newQuantity <= inventoryItem.reorderLevel,
      updatedAt: new Date()
    }
  });

  return NextResponse.json({ stockMovement, updatedItem }, { status: 201 });
}
