'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      {/* Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '15px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#38bdf8' }}>Optical Max</h1>
        <span style={{ fontSize: '14px', color: '#94a3b8' }}>Modern Eyewear Store</span>
      </header>

      {/* Hero */}
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Our Frame Collection</h2>
        <p style={{ color: '#94a3b8', margin: 0 }}>High quality frames at the best prices</p>
      </div>

      {/* Products List */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#94a3b8' }}>No products found.</p>
        ) : (
          products.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f'}
                alt={item.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 'bold' }}>{item.category || 'Eyewear'}</span>
                  <h3 style={{ fontSize: '18px', margin: '8px 0 4px 0' }}>{item.name}</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>₹{item.price}</span>
                  <a
                    href={`https://wa.me/?text=Hi,%20I%20want%20to%20buy%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: '#38bdf8', color: '#000', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    Order
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
                       }
                
