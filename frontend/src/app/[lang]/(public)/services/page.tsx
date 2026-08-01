import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: "التصميم المعماري والإنشائي",
      description: "نقدم تصاميم مبتكرة وعملية تراعي الجماليات والوظيفة وفق أحدث الأكواد الهندسية.",
    },
    {
      title: "الإشراف الهندسي",
      description: "إشراف دقيق على كافة مراحل التنفيذ لضمان مطابقة الأعمال للمخططات والمواصفات.",
    },
    {
      title: "إصدار التراخيص",
      description: "تسهيل وإصدار الرخص الهندسية ورخص البناء من الجهات الحكومية بكل سرعة وكفاءة.",
    },
    {
      title: "إدارة المشاريع",
      description: "تخطيط وتنظيم وإدارة الموارد لضمان نجاح المشاريع ضمن الإطار الزمني والميزانية.",
    },
    {
      title: "الأمن والسلامة",
      description: "اعتماد مخططات وتراخيص الأمن والسلامة والدفاع المدني للمنشآت المختلفة.",
    },
    {
      title: "التصميم الداخلي",
      description: "تصميم فراغات داخلية تجمع بين الأناقة والراحة وتلبي تطلعات عملائنا.",
    }
  ];

  return (
    <div className="py-20 bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-teal mb-4">خدماتنا الهندسية</h1>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-6"></div>
          <p className="text-brand-slate/80 text-lg max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات الهندسية التي تلبي كافة احتياجاتك وتضمن نجاح مشروعك من الفكرة وحتى التسليم.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-transparent hover:border-brand-teal/20 transition-all hover:shadow-md group">
              <div className="w-12 h-12 bg-brand-mist rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
                <span className="text-brand-orange font-bold text-xl">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-teal mb-3">{service.title}</h3>
              <p className="text-brand-slate/70 mb-6">{service.description}</p>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="text-brand-orange font-medium hover:text-brand-teal transition-colors flex items-center gap-2">
                طلب الخدمة
                <span className="text-lg">←</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
