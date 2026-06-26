import React, { useState, useEffect, useRef } from "react";
import { Message } from "../types";
import { Sparkles, MessageSquare, X, Send, Phone, AlertCircle, RefreshCw } from "lucide-react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "안녕하세요! 친절한 하수구·누수·배관 해결사 **'하수구91' AI 매니저**입니다. 24시간 연중무휴 상시대기 중인 하수구91에 무엇이든 물어보세요! \n\n싱크대 역류, 누수 탐지, 고압 세척, 변기 수리 등 증상이나 견적이 궁금하신 부분을 설명해 주시면 상세히 진단 및 도움을 드리겠습니다. \n\n📞 긴급 상담: **010-4122-7980**",
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide notification badge after 10 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowNotification(false);
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = "msg_" + Date.now();
    const newUserMessage: Message = {
      id: userMsgId,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build simple context history (excluding welcome)
      const activeHistory = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: activeHistory,
        }),
      });

      const data = await response.json();
      
      const modelMsgId = "msg_model_" + Date.now();
      const modelText = data.text || "죄송합니다. 서버가 혼잡하여 답변을 준비하지 못했습니다. 더 빠른 상담을 위해 010-4122-7980으로 바로 연락해 주시면 24시간 친절히 설명해 드리겠습니다!";
      
      setMessages((prev) => [
        ...prev,
        {
          id: modelMsgId,
          role: "model",
          text: modelText,
          timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      console.error("AI chatbot API Error:", err);
      const errId = "msg_err_" + Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: errId,
          role: "model",
          text: "연결 오류가 발생했습니다. 아래 간편 견적 신청서에 번호를 남겨주시거나, **010-4122-7980**으로 직접 전화 주시면 즉각적이고 정직한 무료 견적을 안내해 드리겠습니다!",
          timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const quickQuestions = [
    "🚽 변기 뚫는 기본 가격",
    "💧 미세 누수 탐지 방법 및 비용",
    "🌊 배관 고압세척이란?",
    "🕒 24시간 야간 긴급 출동 가능 여부",
  ];

  // Render markdown text roughly into basic HTML elements
  const renderMessageText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      let content: React.ReactNode = line;
      
      // Simple bold rendering **text**
      if (line.includes("**")) {
        const parts = line.split("**");
        content = parts.map((part, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-blue-600 bg-blue-50/50 px-1 rounded">{part}</strong> : part));
      }

      return (
        <span key={idx} className="block min-h-[1.2em]">
          {content}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Quick notification bubble */}
        {showNotification && !isOpen && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold py-2 px-4 rounded-2xl shadow-xl border border-blue-400/20 mb-3 animate-bounce mr-2 max-w-[240px] text-center relative">
            <div className="absolute -bottom-1.5 right-6 w-3.5 h-3.5 bg-indigo-600 rotate-45"></div>
            안녕하세요! 24시 배관 견적 상담 바로 물어보세요 💬
          </div>
        )}

        <button
          id="ai-floating-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
            isOpen ? "bg-slate-900 rotate-90" : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          
          {/* Notification red dot */}
          {!isOpen && showNotification && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white animate-ping"></span>
          )}
        </button>
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col justify-between overflow-hidden z-50 animate-scale-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                AI
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-sm flex items-center gap-1">
                  하수구91 AI 매니저 <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                </h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-semibold">24시간 실시간 배관 견적 상담</span>
                </div>
              </div>
            </div>
            
            <button
              id="ai-chat-close-btn"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className="text-[10px] text-slate-400 font-bold mb-1 px-1">
                  {msg.role === "user" ? "고객님" : "하수구91"}
                </div>
                
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm text-left leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white font-semibold rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                  }`}
                >
                  {renderMessageText(msg.text)}
                </div>

                <div className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</div>
              </div>
            ))}

            {/* AI Loading state */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-400 font-bold mb-1">하수구91 AI 분석중</span>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-0"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Helper section */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 border-t border-slate-100 bg-white text-left">
              <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase block mb-1.5">
                자주 묻는 질문 (바로 상담받기)
              </span>
              <div className="flex flex-col gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    id={`quick-q-${idx}`}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-left bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 text-slate-700 text-xs font-bold py-1.5 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Input Footer */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                id="ai-msg-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="질문을 입력해 주세요 (예: 씽크대 역류 비용)"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                disabled={isLoading}
              />
              <button
                id="ai-send-btn"
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mt-2 border-t border-slate-50 pt-2">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-slate-400" /> 답변은 안내용이며 정확한 것은 직접 점검이 필요합니다.
              </span>
              <a href="tel:010-4122-7980" className="text-blue-600 font-extrabold flex items-center gap-0.5">
                <Phone className="w-2.5 h-2.5" /> 통화연결
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
