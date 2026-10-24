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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.axminprana.com'),
  title: {
    default: 'Axmin Prana | Authentic Ayurvedic Wellness & Classical Formulations',
    template: '%s | Axmin Prana Ayurveda'
  },
  description:
    'Experience classical Ayurveda inspired by the Charaka Samhita. 100% natural, AYUSH-certified Vadha Ranjaga Thailam Pain Relief Oil, Thalis Powder, AXMIN KESHAVEDA Herbal Hair Oil & classical wellness.',
  keywords: [
    'Axmin Prana',
    'Ayurveda',
    'Pain Relief Oil',
    'Vadha Ranjaga Thailam',
    'Ulcer Relief Medicine',
    'Thalis Powder',
    'AXMIN KESHAVEDA Herbal Hair Oil',
    'Ayurvedic medicine',
    'Ashwagandha KSM-66',
    'Kumkumadi Tailam',
    'Triphala Churna',
    'Bringadi Hair Oil',
    'Dosha balance',
    'AYUSH certified',
    'Vedic wellness India',
    'Kerala Ayurveda'
  ],
  authors: [{ name: 'Axmin Prana Ayurveda' }],
  openGraph: {
    title: 'Axmin Prana | Authentic Ayurvedic Wellness & Classical Formulations',
    description: 'Certified classical Ayurveda formulations for mind, body, and vitality. Pure Ayurvedic Pain Relief Oils, Ulcer Relief Churna & Herbal Hair Oils.',
    url: 'https://www.axminprana.com',
    siteName: 'Axmin Prana Ayurveda',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Axmin Prana Ayurveda - Authentic Classical Formulations',
        type: 'image/jpeg'
      },
      {
        url: '/og-logo.png',
        width: 600,
        height: 600,
        alt: 'Axmin Prana Ayurveda Logo',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axmin Prana | Authentic Ayurvedic Wellness & Classical Formulations',
    description: 'Certified classical Ayurveda formulations for mind, body, and vitality.',
    site: '@axminprana',
    creator: '@axminprana',
    images: ['/og-image.jpg']
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
      <head>
        <meta property="og:title" content="Axmin Prana | Authentic Ayurvedic Wellness & Classical Formulations" />
        <meta property="og:description" content="Certified classical Ayurveda formulations for mind, body, and vitality. Pure Ayurvedic Pain Relief Oils, Ulcer Relief Churna & Herbal Hair Oils." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.axminprana.com" />
        <meta property="og:site_name" content="Axmin Prana Ayurveda" />
        <meta property="og:image" content="https://www.axminprana.com/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://www.axminprana.com/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Axmin Prana Ayurveda" />
        <meta property="og:image" content="https://www.axminprana.com/og-logo.png" />
        <meta property="og:image:secure_url" content="https://www.axminprana.com/og-logo.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <link rel="image_src" href="https://www.axminprana.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Axmin Prana | Authentic Ayurvedic Wellness & Classical Formulations" />
        <meta name="twitter:description" content="Certified classical Ayurveda formulations for mind, body, and vitality." />
        <meta name="twitter:image" content="https://www.axminprana.com/og-image.jpg" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF8F1] text-[#202820] font-sans antialiased overflow-x-hidden w-full max-w-full selection:bg-[#214E34] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <QuizProvider>
              <Header />
              <CartDrawer />
              <main className="flex-1 pb-16 md:pb-0">{children}</main>
              <Footer />
              <MobileBottomBar />
            </QuizProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
