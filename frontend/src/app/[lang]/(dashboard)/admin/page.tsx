import { getDictionary, Locale } from '@/dictionaries';

export default async function AdminDashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return (
    <div className="p-8 bg-brand-mist min-h-[70vh]">
      <h1 className="text-3xl font-bold text-brand-slate mb-6">{dict.portals.adminTitle}</h1>
      <div className="bg-white p-6 rounded shadow-sm">
        <p>{dict.portals.adminWelcome}</p>
      </div>
    </div>
  );
}
