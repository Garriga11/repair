// app/inventory/edit/[id]/page.tsx
import prisma from '@/lib/prisma';
import EditInventoryForm from '@/app/inventory/edit/[id]/EditInventory';

export default async function EditInventoryPage({ params }: { params: { id: string } }) {
  const item = await prisma.inventoryItem.findUnique({
    where: { id: params.id }
  });

  if (!item) {
    // You can redirect or show a not found message
    return <div className="p-6 max-w-4xl mx-auto">Item not found.</div>;
  }

  return <EditInventoryForm item={item} />;
}