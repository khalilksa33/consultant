import { getDictionary, Locale } from '@/dictionaries';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return (
    <div className="py-20 bg-brand-ivory min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-teal mb-4">{dict.about.title}</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto"></div>
        </div>
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-brand-slate mb-6">{dict.about.subtitle}</h2>
          <div className="space-y-4 text-brand-slate/80 text-lg leading-relaxed">
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-brand-mist p-6 rounded border border-brand-teal/10">
              <h3 className="text-xl font-bold text-brand-teal mb-3">{dict.about.visionTitle}</h3>
              <p className="text-brand-slate/70">
                {dict.about.visionDesc}
              </p>
            </div>
            <div className="bg-brand-mist p-6 rounded border border-brand-teal/10">
              <h3 className="text-xl font-bold text-brand-teal mb-3">{dict.about.missionTitle}</h3>
              <p className="text-brand-slate/70">
                {dict.about.missionDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
