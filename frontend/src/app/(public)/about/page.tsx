export default function AboutPage() {
  return (
    <div className="py-20 bg-brand-ivory min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-teal mb-4">من نحن</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto"></div>
        </div>
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-brand-slate mb-6">نبذة عن شركة 26i للاستشارات الهندسية</h2>
          <div className="space-y-4 text-brand-slate/80 text-lg leading-relaxed">
            <p>
              نحن شركة رائدة في مجال الاستشارات الهندسية، نسعى دائماً لتقديم حلول مبتكرة ومستدامة تلبي تطلعات عملائنا.
              نجمع بين الخبرة العريقة وأحدث التقنيات لضمان نجاح كل مشروع نتولاه.
            </p>
            <p>
              تأسست الشركة على مبادئ الجودة والدقة والشفافية، مما جعلنا شريكاً موثوقاً للعديد من الأفراد والشركات
              والمطورين العقاريين في المملكة العربية السعودية.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-brand-mist p-6 rounded border border-brand-teal/10">
              <h3 className="text-xl font-bold text-brand-teal mb-3">رؤيتنا</h3>
              <p className="text-brand-slate/70">
                أن نكون الخيار الأول في تقديم الاستشارات الهندسية المتكاملة، وأن نساهم في نهضة وتطوير القطاع العمراني بمعايير عالمية.
              </p>
            </div>
            <div className="bg-brand-mist p-6 rounded border border-brand-teal/10">
              <h3 className="text-xl font-bold text-brand-teal mb-3">رسالتنا</h3>
              <p className="text-brand-slate/70">
                تقديم خدمات هندسية فائقة الجودة من خلال فريق عمل محترف وشغوف، لبناء ثقة مستدامة مع كافة عملائنا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
