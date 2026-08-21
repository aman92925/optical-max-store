'use client';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Sparkles, Send, Eye } from 'lucide-react';

function GlassesModel() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={meshRef}>
      <mesh position={[-0.9, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.9, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.3} roughness={0.1} />
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.3} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! Main Optical Max Eye Care ka AI consultant hoon. Aap kis type ka frame ya lens dhoondh rahe hain?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply || 'Kuch dikkat aayi.' }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Server connect nahi ho pa raha.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-8">
      <header className="flex justify-between items-center border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-sky-400">Optical Max Eye Care</h1>
          <p className="text-sm text-gray-400">AI-Powered 3D Eyewear Experience</p>
        </div>
        <span className="bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Eye size={14} /> 3D Live Store
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Featured: Max Air Flex 3D</h2>
            <span className="text-emerald-400 font-bold">₹1,499</span>
          </div>
          <div className="w-full h-64 md:h-80 bg-gray-950 rounded-xl overflow-hidden cursor-grab">
            <Canvas camera={{ position: [0, 0, 3.5] }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} />
              <GlassesModel />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
          <p className="text-xs text-gray-400 mt-2">Frame ko ungli se ghumakar 360° check karein</p>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 flex flex-col h-[420px]">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
            <Sparkles className="text-yellow-400" size={18} />
            <h2 className="font-semibold">AI Optical Assistant</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-xl text-sm max-w-[85%] ${m.sender === 'user' ? 'ml-auto bg-sky-600' : 'bg-gray-800'}`}>
                {m.text}
              </div>
            ))}
            {loading && <p className="text-xs text-gray-400 animate-pulse">AI soch raha hai...</p>}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
              placeholder="E.g. Mere round face ke liye kaun sa frame sahi hai?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-sky-500 hover:bg-sky-600 p-2 rounded-xl text-white">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
    }
    
