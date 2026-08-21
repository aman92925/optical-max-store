import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: "Aap 'Optical Max Eye Care' ke smart optical consultant ho. Customer ko unke face shape, screen time aur budget ke mutabiq best frames (Aviator, Wayfarer, Round) aur lenses (Blue Cut, Anti-Glare, Photochromic) politely suggest karo.",
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    return Response.json({ reply: response.text() });
  } catch (error) {
    return Response.json({ error: "AI error: " + error.message }, { status: 500 });
  }
}
