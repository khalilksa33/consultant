"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ dict, lang }: { dict: any; lang: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In production, this should hit our express backend API, but since 
      // they might be on different ports during dev, we'll assume standard API path.
      // For Kubernetes, the frontend will call /api/auth/login via Ingress.
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token (in a real app, prefer httpOnly cookies)
        localStorage.setItem('userInfo', JSON.stringify(data));
        
        // Redirect based on role
        if (data.role === 'admin') {
          router.push(`/${lang}/admin`);
        } else {
          router.push(`/${lang}/client`);
        }
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
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-brand-slate mb-2">
          {dict.password}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? '...' : dict.submit}
      </button>
    </form>
  );
}
