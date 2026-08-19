import { getDictionary, Locale } from '@/dictionaries';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default async function ResetPasswordPage({ params }: { params: Promise<{ lang: string; token: string }> }) {
  const { lang, token } = await params;
  const validLang = lang as Locale;
  const dict = await getDictionary(validLang);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-mist/30 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden" dir={validLang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-teal mb-2">{dict.auth.resetPassword}</h1>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded"></div>
          </div>
          
          <ResetPasswordForm dict={dict.auth} lang={validLang} token={token} />
        </div>
      </div>
    </div>
  );
}
