import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import DemoBanner from '@/components/DemoBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Waste2Worth | Circular B2B Industrial Waste Exchange Marketplace',
  description:
    'Turn industrial waste into valuable resources. Connect with verified buyers, discover reusable materials, and build a sustainable Indian circular supply chain.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8FAF7] text-[#1F2937] antialiased selection:bg-[#10B981] selection:text-white">
        <AuthProvider>
          <DemoBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
