'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/app/contact/action';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const formData = new FormData(event.currentTarget);
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus('sent');
      event.currentTarget.reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Your Name" required className="w-full p-2 border rounded" />
      <input type="email" name="email" placeholder="Your Email" required className="w-full p-2 border rounded" />
      <textarea name="message" placeholder="Your Message" required rows={5} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'sent' && <p className="text-green-600">Message sent successfully!</p>}
      {status === 'error' && <p className="text-red-600">Something went wrong. Try again.</p>}
    </form>
  );
}
