import Link from 'next/link';
import { getDictionary, Locale } from '@/dictionaries';

export default async function Navbar({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const toggleLang = lang === 'ar' ? 'en' : 'ar';
  
  return (
    <nav className="bg-white shadow-sm border-b border-brand-mist sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}`} className="text-2xl font-bold text-brand-teal">
              26i <span className="text-brand-orange">Consultations</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:space-x-reverse">
            <Link href={`/${lang}`} className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              {dict.navigation.home}
            </Link>
            <Link href={`/${lang}/about`} className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              {dict.navigation.about}
            </Link>
            <Link href={`/${lang}/services`} className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              {dict.navigation.services}
            </Link>
            <Link href={`/${lang}/contact`} className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              {dict.navigation.contact}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${toggleLang}`} className="text-sm font-medium text-brand-slate hover:text-brand-orange transition-colors">
              {dict.navigation.language}
            </Link>
            <Link href={`/${lang}/client`} className="text-sm font-medium text-brand-teal hover:text-brand-slate transition-colors">
              {dict.navigation.clientPortal}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
