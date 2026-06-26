import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Inquiries persistence file
const INQUIRIES_FILE = path.join(process.cwd(), "inquiries.json");

// Helper to load inquiries
function loadInquiries() {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading inquiries file, resetting:", err);
  }
  return [];
}

// Helper to save inquiries
function saveInquiries(inquiries: any[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving inquiries file:", err);
  }
}

// Ensure the inquiries file is initialized
if (!fs.existsSync(INQUIRIES_FILE)) {
  saveInquiries([]);
}

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ GEMINI_API_KEY environment variable is not defined. AI Chatbot will run in mock demonstration mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes

// 1. Submit a new inquiry
app.post("/api/inquiries", (req, res) => {
  try {
    const { name, phone, serviceType, address, details } = req.body;
    
    if (!name || !phone || !serviceType) {
      return res.status(400).json({ error: "이름, 연락처, 서비스 유형은 필수 항목입니다." });
    }

    const inquiries = loadInquiries();
    const newInquiry = {
      id: "inq_" + Date.now(),
      name,
      phone,
      serviceType,
      address: address || "미지정",
      details: details || "상담 요청",
      createdAt: new Date().toISOString(),
      status: "pending", // pending, completed, canceled
    };

    inquiries.unshift(newInquiry); // Add to the top
    saveInquiries(inquiries);

    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Fetch all inquiries (with simple authorization code "9191")
app.post("/api/admin/inquiries", (req, res) => {
  try {
    const { authCode } = req.body;
    if (authCode !== "9191") {
      return res.status(401).json({ error: "올바르지 않은 관리자 인증 코드입니다." });
    }

    const inquiries = loadInquiries();
    res.json({ inquiries });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Update inquiry status (with admin authorization)
app.patch("/api/admin/inquiries/:id", (req, res) => {
  try {
    const { authCode, status } = req.body;
    const { id } = req.params;

    if (authCode !== "9191") {
      return res.status(401).json({ error: "올바르지 않은 관리자 인증 코드입니다." });
    }

    const inquiries = loadInquiries();
    const inquiryIndex = inquiries.findIndex((inq: any) => inq.id === id);

    if (inquiryIndex === -1) {
      return res.status(404).json({ error: "해당 상담 내역을 찾을 수 없습니다." });
    }

    inquiries[inquiryIndex].status = status;
    saveInquiries(inquiries);

    res.json({ success: true, inquiry: inquiries[inquiryIndex] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Gemini Chatbot Endpoint
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "메시지 내용이 비어 있습니다." });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return a professional mock response if API Key is not configured
      const mockAnswers: { [key: string]: string } = {
        "가격": "안녕하세요! 하수구91입니다. 하수구 막힘 뚫음의 기본 단가는 5만원부터 시작하며, 막힘 강도와 배관 상태, 고압 세척기나 특수 장비 동원 여부에 따라 조율됩니다. 정확한 견적은 현장 확인 후 가장 정직하게 말씀드리고 있으니 010-4122-7980으로 전화 주시거나 아래 간편 상담 폼에 연락처를 남겨주시면 무료로 진단 및 견적을 설명해 드리겠습니다!",
        "비용": "안녕하세요! 하수구91입니다. 하수구 막힘 뚫음의 기본 단가는 5만원부터 시작하며, 막힘 강도와 배관 상태, 고압 세척기나 특수 장비 동원 여부에 따라 조율됩니다. 정확한 견적은 현장 확인 후 가장 정직하게 말씀드리고 있으니 010-4122-7980으로 전화 주시거나 아래 간편 상담 폼에 연락처를 남겨주시면 무료로 진단 및 견적을 설명해 드리겠습니다!",
        "누수": "누수 증상이 의심되시는군요! 미세 누수도 하수구91의 청음식 및 가스식 최고급 누수탐지장비로 오차 없이 정확한 지점을 찾아냅니다. 누수를 방치하면 피해 금액이 커질 수 있으니 신속하게 010-4122-7980으로 연락 주시면 바로 방문하여 잡아드리겠습니다.",
        "고압": "고압세척은 일반 장비로 해결되지 않는 기름 슬러지 덩어리와 흙모래를 초고압 물 분사로 완벽히 부수고 씻어내는 시공입니다. 배관을 새것처럼 복원해 드리는 최고급 프리미엄 작업입니다. 견적 문의는 010-4122-7980으로 주시면 친절히 설명해 드리겠습니다.",
        "시간": "하수구91은 24시간 연중무휴로 운영 중입니다! 천안, 아산 및 인근 지역은 예약 시 또는 긴급 시 접수 후 30분~1시간 이내 신속하게 현장으로 출동할 수 있도록 상시 출장 대기하고 있습니다.",
      };

      let text = "안녕하세요! 친절하고 정확한 하수구 배관 설비 전문 '하수구91' AI 매니저입니다. 하수구 막힘, 누수 탐지, 고압 세척, 싱크대나 변기 막힘 수리 등 무엇이든 물어보세요! 신속한 문의 및 출장 예약은 대표 연락처 **010-4122-7980**으로 바로 전화 주시면 가장 빠르게 해결해 드립니다.";
      
      const lowerMsg = message.toLowerCase();
      for (const key of Object.keys(mockAnswers)) {
        if (lowerMsg.includes(key)) {
          text = mockAnswers[key];
          break;
        }
      }

      return res.json({ text });
    }

    // Prepare system instruction for plumbing business representative
    const systemInstruction = `
You are the professional, friendly, and expert AI Representative for "하수구91" (Sewage 91), a premier sewage system, high-pressure washing, leak detection, and plumbing service based in Korea.
The company's phone number is 010-4122-7980.

Your goals:
1. Provide accurate, helpful, and professional answers in Korean to users' questions regarding plumbing problems (blocked sinks, clogged toilets, sewer main blockages, water leaks, high-pressure jet washing, pipe CCTV inspections).
2. Maintain a highly reassuring, polite, and trustworthy tone. Assure them that "하수구91" has 20+ years of experience, state-of-the-art equipment, operates 24/7, and guarantees 100% resolution (no fix, no pay policy).
3. Actively encourage them to call the direct number 010-4122-7980 for instant dispatch, or guide them to fill out the quick contact form on the website.
4. Keep answers relatively concise and highly readable, formatted in beautiful Markdown (using bolding, lists, and spacing appropriately).

Contextual pricing guidance to keep in mind:
- Basic drain unclogging (하수구 기본 소통): Starts at 50,000 KRW.
- Toilet/Sink unclogging (변기/싱크대 막힘): Starts at 50,000 KRW.
- High-pressure water jet washing (고압세척): Prices vary based on pipe length/diameter, starts from 150,000-300,000 KRW depending on scale.
- Leak detection (누수탐지): Basic inspection and location pinpointing starts at 150,000 KRW.
- Exact price is determined on-site with transparent consultation (거품 없는 정직 정찰제, 추가 부당요금 없음).

Example greeting if relevant: "안녕하세요! 하수구91 AI 매니저입니다. 24시 연중무휴 신속한 배관 해결사 하수구91에 오신 것을 환영합니다! 무엇을 도와드릴까요? (대표전화: 010-4122-7980)"
`;

    // Format contents for generative content API
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Add current message to the list
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "AI 응답을 생성하는 과정에서 오류가 발생했습니다." });
  }
});

// Vite Middleware & Static Assets Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For React SPA fallback in production (Express v4 format)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Sewage91 Server running on http://localhost:${PORT}`);
  });
}

startServer();
