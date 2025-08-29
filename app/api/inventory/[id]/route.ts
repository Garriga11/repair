import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const item = await prisma.inventoryItem.findUnique({
    where: { id: context.params.id, isActive: true }
  });

  if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, description, quantity } = await request.json();

  const updated = await prisma.inventoryItem.update({
    where: { id: context.params.id },
    data: { name, description, quantity }
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.inventoryItem.update({
    where: { id: context.params.id },
    data: { isActive: false }
  });

  return NextResponse.json({ success: true });
}
