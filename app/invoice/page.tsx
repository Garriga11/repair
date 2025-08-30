import prisma from '@/lib/prisma';

export default async function InvoicePage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      account: true,
      ticket: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Ticket</th>
            <th className="py-2 px-4 border-b">Account</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Paid</th>
            <th className="py-2 px-4 border-b">Due</th>
            <th className="py-2 px-4 border-b">Created</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td className="py-2 px-4 border-b">{inv.id}</td>
              <td className="py-2 px-4 border-b">{inv.ticketId}</td>
              <td className="py-2 px-4 border-b">{inv.account?.name}</td>
              <td className="py-2 px-4 border-b">${inv.total.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">${inv.paidAmount.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">${inv.dueAmount.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{new Date(inv.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
