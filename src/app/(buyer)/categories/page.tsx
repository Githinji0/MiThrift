'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import { useStore } from '@/hooks/useStore';
import { ArrowRight, Tag } from 'lucide-react';

export default function CategoriesPage() {
  const { products } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="border-b border-oatmeal pb-4">
        <h1 className="text-3xl font-extrabold text-charcoal font-heading">Shop by Category</h1>
        <p className="text-xs text-muted-clay mt-1">
          Explore curated secondhand items organized by campus life needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const count = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group p-6 rounded-3xl border border-oatmeal shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between h-48"
              style={{ backgroundColor: cat.bgHex }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-sm"
                    style={{ color: cat.textColor }}
                  >
                    <Tag className="w-6 h-6" />
                  </div>
                  <span
                    className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/70"
                    style={{ color: cat.textColor }}
                  >
                    {count} item{count === 1 ? '' : 's'}
                  </span>
                </div>

                <h2
                  className="text-xl font-bold font-heading group-hover:translate-x-1 transition-transform"
                  style={{ color: cat.textColor }}
                >
                  {cat.name}
                </h2>
                <p
                  className="text-xs opacity-80 mt-1.5 leading-relaxed line-clamp-2"
                  style={{ color: cat.textColor }}
                >
                  {cat.description}
                </p>
              </div>

              <div
                className="pt-4 flex items-center justify-between text-xs font-bold font-heading border-t border-black/5"
                style={{ color: cat.textColor }}
              >
                <span>Browse {cat.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
