import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CSCenter from "./components/CSCenter";
import Services from "./components/Services";
import Strengths from "./components/Strengths";
import CaseStudies from "./components/CaseStudies";
import InquiryForm from "./components/InquiryForm";
import AIChatbot from "./components/AIChatbot";
import AdminPanel from "./components/AdminPanel";
import { Phone, Check, Clock, ShieldCheck, Mail, MapPin } from "lucide-react";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleAdminToggle = () => {
    setIsAdminOpen(!isAdminOpen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Sticky Header */}
      <Header onAdminToggle={handleAdminToggle} isAdminOpen={isAdminOpen} />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {isAdminOpen ? (
          /* Admin Lead Management Board */
          <div className="pt-24">
            <AdminPanel />
          </div>
        ) : (
          /* Normal Professional Landing Page */
          <>
            <Hero />
            <CSCenter />
            <Services />
            <Strengths />
            <CaseStudies />
            <InquiryForm />
          </>
        )}
      </main>

      {/* AI Assistant Chatbot */}
      <AIChatbot />

      {/* High-Fidelity Professional Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo / Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                91
              </div>
              <span className="text-xl font-black text-white tracking-tight">하수구91</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              하수구91은 하수구 막힘, 배관 고압세척, 누수탐지, 변기 및 싱크대 보수 등 배관 설비 전반을 다루는 전문 홈케어 설비 기업입니다. 
              최첨단 장비와 20년 경력의 노하우로 막힘 없는 시원함을 선사하겠습니다.
            </p>
            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" /> 24시 연중무휴 출장
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 실패 시 100% 미청구
              </span>
            </div>
          </div>

          {/* Service Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-extrabold text-sm border-b border-slate-800 pb-2">전문 서비스 영역</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors">하수구 메인관 / 공동 횡주관 고압세척</li>
              <li className="hover:text-white transition-colors">아파트/상가 싱크대 역류 및 배수구 세척</li>
              <li className="hover:text-white transition-colors">청음식 & 가스식 첨단 정밀 누수 탐지</li>
              <li className="hover:text-white transition-colors">화장실 양변기, 소변기 막힘 압력 관통</li>
              <li className="hover:text-white transition-colors">산업용 CCTV 내시경 촬영 및 관로 탐지</li>
            </ul>
          </div>

          {/* Area of Coverage */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-extrabold text-sm border-b border-slate-800 pb-2">출장 가능 지역</h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>• 전주시 완산구 전지역 (효자동, 평화동, 삼천동 등)</li>
              <li>• 전주시 덕진구 전지역 (송천동, 우아동, 호성동 등)</li>
              <li>• 전북 혁신도시, 에코시티, 완주군 전지역</li>
              <li>• 군산시, 익산시, 김제시 등 전북 전역 신속출장</li>
            </ul>
          </div>

          {/* Contact and Business Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-extrabold text-sm border-b border-slate-800 pb-2">고객센터 및 대표문의</h4>
            <div className="space-y-3">
              <a
                id="footer-call"
                href="tel:010-4122-7980"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold text-center text-sm shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white animate-pulse" />
                대표전화: 010-4122-7980
              </a>
              <div className="text-[10px] text-slate-500 space-y-1 leading-normal">
                <div className="flex items-start gap-1">
                  <MapPin className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                  <span>주소: 전라북도 전주시 완산구 홍산중앙로 (효자동)</span>
                </div>
                <div>대표자: 홍길동 | 상호명: 하수구91</div>
                <div>사업자등록번호: 312-09-12345 (정식 등록 설비 업체)</div>
                <div>메일: info@sewage91.com</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-600">
          <div>
            © 2026 하수구91. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#site-header" className="hover:text-slate-400">이용약관</a>
            <span>|</span>
            <a href="#site-header" className="hover:text-slate-400">개인정보처리방침</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
