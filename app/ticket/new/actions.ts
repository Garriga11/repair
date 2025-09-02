'use client';

import { useState } from 'react';
import { createSimpleTicketAction } from '@/app/actions/tickets';

export default function NewTicketForm() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [device, setDevice] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await createSimpleTicketAction({
      customerName,
      customerPhone,
      device,
      deviceSN: '12345',
      description: 'Screen cracked',
      location: 'Shop 1',
      ticketBalance: '100',
      status: 'open',
    });

    if (res.success) {
      setMessage(`✅ Ticket created: ${res.ticketId}`);
    } else {
      setMessage(`❌ ${res.error}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Phone"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Device"
        value={device}
        onChange={(e) => setDevice(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Ticket
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}