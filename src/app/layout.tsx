import type { Metadata } from 'next';
import { Manrope, Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { QuizProvider } from '../context/QuizContext';
import { MobileBottomBar } from '../components/MobileBottomBar';

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

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://axminprana.com'),
  title: 'Axmin Prana | Authentic Ayurvedic Wellness & Classical Formulations',
  description:
    'Experience classical Ayurveda inspired by the Charaka Samhita. 100% natural, AYUSH-certified Ashwagandha, Triphala, Kumkumadi Tailam & Bringadi oils crafted in Kerala.',
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png' },
      { url: '/logo.png' }
    ]
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#163A28',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F1] text-[#202820] font-sans antialiased overflow-x-hidden w-full max-w-full selection:bg-[#214E34] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <QuizProvider>
              <Header />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileBottomBar />
            </QuizProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
