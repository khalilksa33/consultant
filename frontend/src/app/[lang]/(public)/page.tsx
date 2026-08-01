import Link from 'next/link';
import { getDictionary, Locale } from '@/dictionaries';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-brand-ivory text-brand-slate py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-teal mb-6 leading-tight">
              {dict.home.title} <span className="text-brand-orange">{dict.home.titleHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-slate/80 mb-10">
              {dict.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-brand-orange text-white rounded-md hover:bg-opacity-90 font-bold shadow-lg transition-transform hover:-translate-y-1">
                {dict.home.cta1}
              </Link>
              <Link href={`/${lang}/services`} className="px-8 py-4 bg-white text-brand-teal border border-brand-teal/20 rounded-md hover:bg-brand-mist font-bold shadow-sm transition-transform hover:-translate-y-1">
                {dict.home.cta2}
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-teal opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-brand-orange opacity-5 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Services Placeholder */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-slate mb-4">{dict.home.servicesTitle}</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.home.services.map((service, idx) => (
              <div key={idx} className="p-8 border border-brand-mist rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-brand-teal mb-3">{service.title}</h3>
                <p className="text-brand-slate/70">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
