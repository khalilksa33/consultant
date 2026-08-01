import type { Metadata } from "next";
import "../globals.css";
import { Locale } from '@/dictionaries';

export const metadata: Metadata = {
  title: "26i Engineering Consultations",
  description: "Leading engineering consultations in Saudi Arabia",
};

export async function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const validLang = lang as Locale;
  
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
