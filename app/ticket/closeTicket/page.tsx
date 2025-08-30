
import CloseTicketForm from './CloseTicketForm';

export default function CloseTicketPage({ searchParams }: any) {
  // You can also use params if you want to use a dynamic route
  const ticketId = searchParams?.ticketId || '';
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Close Ticket & Generate Invoice</h1>
      <CloseTicketForm ticketId={ticketId} />
    </div>
  );
}
