import { Suspense } from "react";
import RecentTickets from "@/components/recentTickets";

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-8">
        Latest Tickets
      </h1>
      <Suspense fallback={<div>Loading tickets...</div>}>
        <RecentTickets />
      </Suspense>
    </div>
  );
}
