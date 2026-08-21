'use client';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Sparkles, Send, Eye, ShieldCheck, ArrowDown, ShoppingBag } from 'lucide-react';

function GlassesModel() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={meshRef}>
      <mesh position={[-0.9, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.9, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      <mesh position={[0.9, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.35} roughness={0.1} />
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
    <main className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#111827] to-[#0b0f19] text-white p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-12">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center border-b border-gray-800 pb-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Optical Max Eye Care
          </h1>
          <p className="text-xs text-gray-400">Next-Gen 3D & AI Eyewear Experience</p>
        </div>
        <span className="bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-sky-500/30">
          <Eye size={14} /> 3D Live Experience
        </span>
      </motion.header>

      {/* Hero 3D Interactive Floating Frame */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-tr from-sky-950/40 to-indigo-950/40 border border-sky-800/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-2xl"
      >
        <div className="flex-1 space-y-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-semibold tracking-wider text-sky-400 uppercase bg-sky-900/50 px-3 py-1 rounded-md"
          >
            Special Launch Edition
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-black leading-tight"
          >
            Move & Explore in Full 3D
          </motion.h2>
          <p className="text-gray-300 text-sm md:text-base">
            Ghumayein, zoom karein aur har angle se material aur frame finish dekhein.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <span className="text-2xl font-bold text-emerald-400">₹1,499</span>
            <button className="bg-sky-500 hover:bg-sky-600 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all">
              <ShoppingBag size={16} /> Buy Frame Now
            </button>
          </div>
        </div>

        {/* Floating 3D Canvas */}
        <div className="w-full md:w-1/2 h-72 md:h-96 rounded-2xl bg-black/40 border border-gray-800/80 cursor-grab relative">
          <Canvas camera={{ position: [0, 0, 3.5] }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
              <GlassesModel />
            </Float>
            <OrbitControls enableZoom={false} />
          </Canvas>
          <span className="absolute bottom-3 right-3 text-[11px] text-gray-400 bg-gray-900/80 px-2 py-1 rounded border border-gray-700">
            Touch & Drag 360°
          </span>
        </div>
      </motion.section>

      {/* AI Assistant Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 flex flex-col h-[460px] shadow-xl"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
          <Sparkles className="text-yellow-400" size={20} />
          <div>
            <h2 className="font-semibold text-base">AI Optical Consultant</h2>
            <p className="text-xs text-gray-400">Poochiye face shape ya lens power ke baare me</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 rounded-2xl text-sm max-w-[85%] leading-relaxed ${m.sender === 'user' ? 'ml-auto bg-sky-600 shadow-md' : 'bg-gray-800/90 border border-gray-700/50'}`}
            >
              {m.text}
            </motion.div>
          ))}
          {loading && <p className="text-xs text-sky-400 animate-pulse">AI advice ready kar raha hai...</p>}
        </div>

        <div className="flex gap-2 mt-4">
          <input
            className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-all"
            placeholder="E.g. Computer use ke liye kaun sa lens best hai?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="bg-sky-500 hover:bg-sky-600 px-4 rounded-xl text-white transition-all">
            <Send size={18} />
          </button>
        </div>
      </motion.section>
    </main>
  );
    }
          
