// app/inventory/edit/[id]/page.tsx
import prisma from '@/lib/prisma';
import EditInventoryForm from '@/app/inventory/edit/[id]/EditInventory';
import { notFound } from 'next/navigation';

export default async function EditInventoryPage({ params }: any) {
  const item = await prisma.inventoryItem.findUnique({
    where: { id: params.id }
  });

  if (!item) {
    notFound();
  }

  return <EditInventoryForm item={item} />;
}