import Link from 'next/link';
import { getDictionary, Locale } from '@/dictionaries';

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return (
    <div className="py-20 bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-teal mb-4">{dict.services.title}</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-6"></div>
          <p className="text-brand-slate/80 text-lg max-w-2xl mx-auto">
            {dict.services.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dict.services.list.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-transparent hover:border-brand-teal/20 transition-all hover:shadow-md group">
              <div className="w-12 h-12 bg-brand-mist rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
                <span className="text-brand-orange font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-teal mb-3">{service.title}</h3>
              <p className="text-brand-slate/70 mb-6">{service.description}</p>
              <Link href={`/${validLang}/contact?service=${encodeURIComponent(service.title)}`} className="text-brand-orange font-medium hover:text-brand-teal transition-colors flex items-center gap-2">
                {dict.services.request}
                <span className={`text-lg ${validLang === 'ar' ? 'rotate-180' : ''}`}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
