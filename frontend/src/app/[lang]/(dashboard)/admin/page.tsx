import { getDictionary, Locale } from '@/dictionaries';
import AdminDashboardClient from '@/components/dashboard/AdminDashboardClient';

export default async function AdminDashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return <AdminDashboardClient dict={dict} lang={validLang} />;
}
