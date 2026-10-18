import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, User, ArrowLeft, Calendar, Tag, ShieldCheck } from 'lucide-react';
import { IArticle } from '../../../lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<IArticle | null> {
  try {
    const res = await fetch(`${API_BASE}/articles/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | Axmin Prana Ayurveda Journal`,
    description: article.excerpt
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#214E34] hover:text-[#B86F4B] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Ayurveda Journal
        </Link>
        <span className="block text-xs font-bold text-[#B86F4B] uppercase tracking-wider mb-2">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-brand font-bold text-[#214E34] leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#687168] mt-4 pt-4 border-t border-[#E5E8E0]">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4 text-[#214E34]" /> By {article.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#214E34]" /> {article.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#214E34]" /> Published {new Date(article.publishedAt).toLocaleDateString('en-IN')}
          </span>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-[#FAF8F1] border border-[#E5E8E0] shadow-sm">
        <Image src={article.image} alt={article.title} fill priority className="object-cover" />
      </div>

      {/* Excerpt Lead */}
      <p className="text-base sm:text-lg text-[#202820] font-medium leading-relaxed italic border-l-4 border-[#214E34] pl-4 bg-[#FAF8F1] p-4 rounded-r-xl">
        {article.excerpt}
      </p>

      {/* Body Content */}
      <div className="space-y-6 text-sm text-[#202820] leading-relaxed">
        <p>{article.content}</p>
        <p>
          Classical Ayurveda prioritizes Ahara (wholesome nutrition), Vihara (healthy lifestyle), and Aushadha (botanical medicine) in precise balance. When pure botanicals are harvested in their natural Himalayan or tropical habitats and processed via classical Samskara, their bio-compatibility remains preserved.
        </p>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-6 border-t border-[#E5E8E0] flex flex-wrap gap-2 text-xs">
          {article.tags.map(t => (
            <span key={t} className="px-3 py-1 bg-white border border-[#E5E8E0] rounded-full text-[#687168] font-medium">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Vaidya Note Card */}
      <div className="bg-[#DDE7D9]/40 border border-[#214E34]/20 rounded-2xl p-6 text-xs text-[#202820] space-y-2">
        <span className="font-bold text-[#214E34] uppercase tracking-wider block">
          Editorial & Clinical Verification
        </span>
        <p className="text-[#687168]">
          This monograph is compiled in accordance with the classical Ayurvedic pharmacopeia and modern peer-reviewed phytochemical research. Formulations cited are licensed under the Ministry of AYUSH.
        </p>
      </div>
    </article>
  );
}
