import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "Aap 'Optical Max Eye Care' ke smart optical consultant ho. Customer ko unke face shape, screen time aur budget ke mutabiq best frames (Aviator, Wayfarer, Round) aur lenses (Blue Cut, Anti-Glare, Photochromic) politely suggest karo.",
      }
    });

    return Response.json({ reply: response.text });
  } catch (error) {
    return Response.json({ error: "AI error: " + error.message }, { status: 500 });
  }
}
