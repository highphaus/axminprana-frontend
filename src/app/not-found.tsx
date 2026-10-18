import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#DDE7D9] flex items-center justify-center mx-auto text-[#214E34]">
        <Compass className="w-8 h-8 text-[#214E34]" />
      </div>
      <span className="text-xs font-bold text-[#B86F4B] uppercase tracking-widest">
        404 • Formulation Path Not Found
      </span>
      <h1 className="text-3xl font-serif-brand font-bold text-[#214E34]">
        This Vedic Path Does Not Exist
      </h1>
      <p className="text-xs sm:text-sm text-[#687168] max-w-sm mx-auto leading-relaxed">
        The formulation, article, or page you sought may have moved or been retired from our classical dispensary catalogue.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#214E34] hover:bg-[#163A28] text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Storefront
        </Link>
      </div>
    </div>
  );
}
