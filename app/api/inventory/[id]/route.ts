import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Parse search params
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Fetch a single item
    const item = await prisma.inventoryItem.findUnique({
      where: { id, isActive: true }
    });
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    return NextResponse.json(item);
  } else {
    // Fetch all items
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
}