import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-brand-mist sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-brand-teal">
              26i <span className="text-brand-orange">Consultations</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:space-x-reverse">
            <Link href="/" className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              الرئيسية
            </Link>
            <Link href="/about" className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              من نحن
            </Link>
            <Link href="/services" className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              خدماتنا
            </Link>
            <Link href="/projects" className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              مشاريعنا
            </Link>
            <Link href="/contact" className="text-brand-slate hover:text-brand-orange px-3 py-2 text-sm font-medium transition-colors">
              تواصل معنا
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/client" className="text-sm font-medium text-brand-teal hover:text-brand-slate transition-colors">
              تسجيل الدخول
            </Link>
            <Link href="/contact" className="bg-brand-orange text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm">
              اطلب خدمة
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
