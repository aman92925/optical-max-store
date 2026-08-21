'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingBag } from 'lucide-react';

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
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-10 text-center tracking-wide">Optical Max Eyewear</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:border-sky-500 transition-all">
            {p.image_url && (
              <img src={p.image_url} alt={p.name} className="w-full h-48 object-cover rounded-2xl mb-4" />
            )}
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p className="text-gray-400 mb-4">{p.category || 'Luxury'}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-sky-400">₹{p.price}</span>
              <button className="bg-sky-500 p-3 rounded-full hover:bg-sky-600">
                <ShoppingBag size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
          }
