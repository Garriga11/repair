import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const inventory = await prisma.inventoryItem.findMany({
    where: { isActive: true },
    orderBy: [
      { needsReorder: 'desc' },
      { quantity: 'asc' },
      { name: 'asc' }
    ]
  });

  return NextResponse.json(inventory);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await request.json();
  const {
    sku, name, description, category, deviceModel,
    quantity, reorderLevel, cost, sellPrice, location, binNumber
  } = data;

  const existingItem = await prisma.inventoryItem.findUnique({ where: { sku } });
  if (existingItem) return NextResponse.json({ error: 'SKU already exists' }, { status: 400 });

  const newItem = await prisma.inventoryItem.create({
    data: {
      sku,
      name,
      description,
      category,
      deviceModel,
      quantity: parseInt(quantity) || 0,
      reorderLevel: parseInt(reorderLevel) || 5,
      cost: parseFloat(cost),
      sellPrice: sellPrice ? parseFloat(sellPrice) : null,
      location,
      binNumber,
      needsReorder: parseInt(quantity) <= parseInt(reorderLevel)
    }
  });

  if (parseInt(quantity) > 0) {
    await prisma.stockMovement.create({
      data: {
        inventoryId: newItem.id,
        type: 'STOCK_IN',
        quantity: parseInt(quantity),
        reason: 'Initial stock',
        userId: session.user.id
      }
    });
  }

  return NextResponse.json(newItem, { status: 201 });
}
