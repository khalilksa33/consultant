"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [lang, setLang] = useState('ar');
  const router = useRouter();

  useEffect(() => {
    params.then((p) => setLang(p.lang));

    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      router.push(`/${lang}/login`);
    } else {
      setAuthorized(true);
    }
  }, [lang, params, router]);

  if (!authorized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    router.push(`/${lang}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-mist">
      {/* Simple Dashboard Navbar */}
      <nav className="bg-white shadow-sm border-b border-brand-teal/10 py-4 px-8 flex justify-between items-center">
        <Link href={`/${lang}`} className="text-xl font-bold text-brand-teal">
          26i Consultations
        </Link>
        <button
          onClick={handleLogout}
          className="text-brand-orange hover:text-brand-orange/80 font-medium"
        >
          {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </button>
      </nav>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
