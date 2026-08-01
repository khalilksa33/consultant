import Link from 'next/link';
import { getDictionary, Locale } from '@/dictionaries';

export default async function Footer({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  
  return (
    <footer className="bg-brand-slate text-brand-ivory mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="text-2xl font-bold text-white mb-4 block">
              26i <span className="text-brand-orange">Consultations</span>
            </Link>
            <p className="text-brand-mist opacity-80 max-w-sm">
              {dict.home.subtitle}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{dict.navigation.services}</h3>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/about`} className="hover:text-brand-orange transition-colors">{dict.navigation.about}</Link></li>
              <li><Link href={`/${lang}/services`} className="hover:text-brand-orange transition-colors">{dict.navigation.services}</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-brand-orange transition-colors">{dict.navigation.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{dict.navigation.contact}</h3>
            <ul className="space-y-2 text-sm text-brand-mist opacity-80">
              <li>info@26i-consult.com</li>
              <li>+966 50 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-teal/30 mt-12 pt-8 text-sm text-center text-brand-mist opacity-60 flex flex-col md:flex-row justify-between items-center">
          <p>{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
