import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Locale } from "@/dictionaries";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = lang as Locale;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar lang={validLang} />
      <main className="flex-grow">{children}</main>
      <Footer lang={validLang} />
    </div>
  );
}
