'use client';
import { useEffect, useState } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnglqmrznyskaobfnlas.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#09090b', minHeight: '100vh', color: '#f4f4f5', padding: '24px' }}>
      <header style={{ borderBottom: '1px solid #27272a', paddingBottom: '16px', maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#38bdf8' }}>Optical Max</h1>
        <span style={{ fontSize: '14px', color: '#a1a1aa' }}>Eyewear Store</span>
      </header>

      <section style={{ textAlign: 'center', margin: '40px 0' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Frame Collection</h2>
        <p style={{ color: '#a1a1aa', margin: 0 }}>High quality optical frames & sunglasses</p>
      </section>

      <main style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#a1a1aa' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#a1a1aa' }}>No products available.</p>
        ) : (
          products.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#18181b', borderRadius: '16px', border: '1px solid #27272a', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f'}
                alt={item.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {item.category || 'Eyewear'}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{item.name}</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>₹{item.price}</span>
                  <a
                    href={`https://wa.me/?text=Hi,%20I%20want%20to%20order%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: '#38bdf8', color: '#09090b', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
            }
