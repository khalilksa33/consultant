import { getDictionary, Locale } from '@/dictionaries';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return (
    <div className="py-20 bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-teal mb-4">{dict.contact.title}</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-6"></div>
          <p className="text-brand-slate/80 text-lg max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-sm h-full">
              <h2 className="text-2xl font-bold text-brand-teal mb-8">{dict.contact.infoTitle}</h2>
              <div className="space-y-6 text-brand-slate">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-mist rounded-full flex items-center justify-center shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{dict.contact.addressTitle}</h3>
                    <p className="opacity-80">{dict.contact.addressDesc}<br />{dict.contact.addressTitle}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-mist rounded-full flex items-center justify-center shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{dict.contact.emailTitle}</h3>
                    <p className="opacity-80">info@26i-consult.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-mist rounded-full flex items-center justify-center shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{dict.contact.phoneTitle}</h3>
                    <p className="opacity-80" dir="ltr">+966 50 000 0000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form className="bg-white p-8 rounded-lg shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-brand-teal mb-6">{dict.contact.formTitle}</h2>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-slate mb-2">{dict.contact.name}</label>
                <input type="text" id="name" className="w-full px-4 py-3 rounded border border-brand-mist focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all bg-brand-ivory/30" placeholder={dict.contact.namePlaceholder} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-slate mb-2">{dict.contact.email}</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded border border-brand-mist focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all bg-brand-ivory/30" placeholder={dict.contact.emailPlaceholder} required dir="ltr" />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-brand-slate mb-2">{dict.contact.serviceType}</label>
                <select id="service" className="w-full px-4 py-3 rounded border border-brand-mist focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all bg-brand-ivory/30">
                  <option value="">{dict.contact.serviceSelect}</option>
                  <option value="design">{dict.services.list[0].title}</option>
                  <option value="supervision">{dict.services.list[1].title}</option>
                  <option value="license">{dict.services.list[2].title}</option>
                  <option value="other">{dict.contact.other}</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-slate mb-2">{dict.contact.message}</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded border border-brand-mist focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all bg-brand-ivory/30 resize-none" placeholder={dict.contact.messagePlaceholder} required></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-orange text-white font-bold py-3 px-4 rounded hover:bg-opacity-90 transition-colors shadow-sm">
                {dict.contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
