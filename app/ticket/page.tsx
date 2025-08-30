import { Suspense } from "react";
import TicketList from "@/app/components/ticketList";

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-8">
        Latest Tickets
      </h1>
      <Suspense fallback={<div>Loading tickets...</div>}>
        <TicketList />
      </Suspense>
    </div>
  );
}
        <div className="flex items-center justify-center space-x-2 min-h-[200px] shadow-2xl">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : tickets.length === 0 ? (
        <p className="text-gray-600">No tickets available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border p-6 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow"
            >
              <Link
                href={`/ticket/${ticket.id}`}
                className="text-2xl font-semibold text-gray-900 hover:underline"
              >
                {ticket.deviceSN}
              </Link>
              <p className="text-sm text-gray-500">
                {ticket.deviceSN} - {ticket.device}
              </p>
                  <p className="text-sm text-gray-500">
                {ticket.accountId} - {ticket.location}
              </p>
              <p className="text-sm text-gray-500">
                {ticket.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-2 font-medium">
                Status:{" "}
                <span
                  className={
                    ticket.status === "OPEN"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {ticket.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-8">
        {page > 1 && (
          <Link href={`/tickets?page=${page - 1}`}>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Previous
            </button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/tickets?page=${page + 1}`}>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Next
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
