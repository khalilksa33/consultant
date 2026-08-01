import { getDictionary, Locale } from '@/dictionaries';
import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);
  
  return (
    <div className="py-20 bg-brand-ivory min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-teal mb-4">{dict.auth.login}</h1>
          <div className="w-16 h-1 bg-brand-orange mx-auto"></div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <LoginForm dict={dict.auth} lang={validLang} />
        </div>
      </div>
    </div>
  );
}
