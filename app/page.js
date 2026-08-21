'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingBag, Sparkles } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold tracking-widest uppercase bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
          Optical Max
        </h1>
        <span className="text-xs px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full flex items-center gap-1">
          <Sparkles size={12} /> Premium Eyewear
        </span>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
          Elevate Your Vision
        </h2>
        <p className="text-neutral-400 text-sm md:text-base">
          Precision crafted luxury frames designed for ultimate comfort and clarity.
        </p>
      </section>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition duration-300 flex flex-col justify-between shadow-lg"
            >
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-56 object-cover bg-neutral-900"
                />
              ) : (
                <div className="w-full h-56 bg-neutral-800 flex items-center justify-center text-neutral-500 text-sm">
                  No Image Available
                </div>
              )}
              
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                    {p.category || 'Eyewear'}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    {p.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800">
                  <span className="text-xl font-bold text-white">
                    ₹{p.price}
                  </span>
                  <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-black font-semibold px-4 py-2 rounded-xl transition text-sm">
                    <ShoppingBag size={16} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
                    }
            
