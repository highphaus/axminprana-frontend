import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react';
import { IArticle, API_BASE } from '../../lib/api';

async function getArticles(): Promise<IArticle[]> {
  try {
    const res = await fetch(`${API_BASE}/articles`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (e) {
    return [];
  }
}

export const metadata = {
  title: 'Ayurveda Health Journal & Monographs | Axmin Prana',
  description: 'Evidence-based articles on classical Ayurvedic medicine, herbology, Dinacharya daily routines, and dosha balance.'
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#B86F4B]">
          Ayurvedic Monographs & Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-brand font-bold text-[#214E34]">
          The Vedic Wellness Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#687168]">
          Authored by certified BAMS Vaidyas and botanical researchers. Bridging ancient texts with contemporary wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map(art => (
          <Link
            key={art._id}
            href={`/articles/${art.slug}`}
            className="group bg-white rounded-2xl border border-[#E5E8E0] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF8F1]">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#214E34] text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                  {art.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] text-[#687168] mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {art.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {art.author}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#202820] group-hover:text-[#214E34] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#687168] mt-2 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2 border-t border-[#E5E8E0]/60 flex items-center justify-between text-xs font-semibold text-[#B86F4B]">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
