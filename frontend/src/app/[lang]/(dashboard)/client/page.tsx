import { getDictionary, Locale } from '@/dictionaries';
import ClientDashboardClient from '@/components/dashboard/ClientDashboardClient';

export default async function ClientDashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return <ClientDashboardClient dict={dict} lang={validLang} />;
}
