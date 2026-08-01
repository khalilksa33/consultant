import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-slate text-brand-ivory mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              26i <span className="text-brand-orange">Consultations</span>
            </Link>
            <p className="text-brand-mist opacity-80 max-w-sm">
              نقدم استشارات هندسية احترافية وموثوقة لبناء الثقة مع الأفراد والشركات والمطورين العقاريين.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-brand-orange transition-colors">من نحن</Link></li>
              <li><Link href="/services" className="hover:text-brand-orange transition-colors">الخدمات</Link></li>
              <li><Link href="/projects" className="hover:text-brand-orange transition-colors">المشاريع</Link></li>
              <li><Link href="/faq" className="hover:text-brand-orange transition-colors">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm text-brand-mist opacity-80">
              <li>الرياض، المملكة العربية السعودية</li>
              <li>info@26i-consult.com</li>
              <li>+966 50 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-teal/30 mt-12 pt-8 text-sm text-center text-brand-mist opacity-60 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} شركة 26i للاستشارات الهندسية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
