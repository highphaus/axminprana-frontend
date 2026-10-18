import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Axmin Prana | Authentic Ayurvedic Wellness & Classical Formulations',
  description:
    'Experience classical Ayurveda inspired by the Charaka Samhita. 100% natural, AYUSH-certified Ashwagandha, Triphala, Kumkumadi Tailam & Bringadi oils with pan-India express shipping.',
  keywords: [
    'Ayurveda',
    'Ayurvedic medicine',
    'Ashwagandha KSM-66',
    'Kumkumadi Tailam',
    'Triphala Churna',
    'Bringadi Hair Oil',
    'Dosha balance',
    'AYUSH certified',
    'Vedic wellness India',
    'Forest Essentials inspired luxury',
    'Kama Ayurveda discovery'
  ],
  authors: [{ name: 'Axmin Prana Ayurveda' }],
  openGraph: {
    title: 'Axmin Prana | Pure Ayurvedic Formulations & Wellness',
    description: 'Certified classical Ayurveda formulations for mind, body, and vitality.',
    siteName: 'Axmin Prana',
    locale: 'en_IN',
    type: 'website'
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F1] text-[#202820] font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
