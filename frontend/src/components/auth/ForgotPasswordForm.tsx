"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordForm({ dict, lang }: { dict: any; lang: string }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(dict.linkSent || 'Link generated check logs');
      } else {
        setError(dict.error || data.message);
      }
    } catch (err) {
      setError(dict.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-50 text-green-600 p-4 rounded-md border border-green-200">
          {message}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-slate mb-2">
          {dict.email}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded border border-brand-mist focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all bg-brand-ivory/30"
          required
          dir="ltr"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-orange text-white font-bold py-3 px-4 rounded hover:bg-opacity-90 transition-colors shadow-sm disabled:opacity-50"
      >
        {loading ? '...' : dict.sendResetLink}
      </button>

      <div className="text-center mt-4 text-brand-slate text-sm">
        <Link href={`/${lang}/login`} className="hover:text-brand-orange hover:underline font-medium">
          {dict.backToLogin}
        </Link>
      </div>
    </form>
  );
}
