import React, { useState, useEffect } from "react";
import { Phone, Menu, X, Shield, Clock, Lock } from "lucide-react";

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminOpen: boolean;
}

export default function Header({ onAdminToggle, isAdminOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top Fixed Phone Bar */}
      <div className={`w-full py-2 px-6 md:px-10 text-xs font-bold flex justify-between items-center transition-colors duration-300 border-b ${
        scrolled
          ? "bg-[#0b1329] text-slate-100 border-slate-800"
          : "bg-black/30 text-white/90 border-white/5"
      }`}>
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-black tracking-wider shrink-0">24시 긴급출장</span>
          <span className="truncate hidden sm:inline">전주 완산구 · 덕진구 전지역 상시 배차 대기 중</span>
          <span className="truncate sm:hidden">전주 전역 상시 대기</span>
        </div>
        <a
          href="tel:010-4122-7980"
          className="flex items-center gap-1.5 hover:scale-105 transition-transform text-[#00ebff] font-extrabold text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 shrink-0 fill-[#00ebff]" />
          <span>010-4122-7980</span>
        </a>
      </div>

      <header
        id="site-header"
        className={`w-full transition-all duration-300 h-20 flex items-center ${
          scrolled
            ? "bg-white border-b border-slate-200/80 shadow-md text-slate-800"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex justify-between items-center">
          {/* Logo and Brand Name */}
          <button
            id="header-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl transition-all duration-300 ${
              scrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"
            }`}>
              91
            </div>
            <div>
              <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${
                scrolled ? "text-slate-800" : "text-white"
              }`}>
                전주누수<span className={scrolled ? "text-blue-600" : "text-blue-200"}>출장</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 font-bold text-sm transition-colors duration-300 ${
            scrolled ? "text-slate-700" : "text-white"
          }`}>
            <button
              id="nav-home-btn"
              onClick={() => scrollToSection("strengths-section")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              업체소개
            </button>
            <button
              id="nav-services-btn"
              onClick={() => scrollToSection("services-section")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              서비스안내
            </button>
            <button
              id="nav-cases-btn"
              onClick={() => scrollToSection("cases-section")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              포토갤러리
            </button>
            <button
              id="nav-inquiry-btn"
              onClick={() => scrollToSection("inquiry-section")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              온라인문의
            </button>
            <button
              id="nav-notice-btn"
              onClick={() => scrollToSection("services-section")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              공지사항
            </button>
            <button
              id="nav-admin-btn"
              onClick={onAdminToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors duration-200 ${
                isAdminOpen
                  ? "bg-amber-100 text-amber-800"
                  : scrolled
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  : "bg-white/10 text-white hover:bg-white/25"
              }`}
            >
              <Lock className="w-3 h-3" />
              {isAdminOpen ? "관리자 닫기" : "관리자 모드"}
            </button>
          </nav>

          {/* Call to Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Main Direct Call Link or Online Inquiry Button */}
            <button
              id="header-inquiry-pill"
              onClick={() => scrollToSection("inquiry-section")}
              className="hidden md:flex items-center gap-2 bg-[#0051e0] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-blue-700 transition-all duration-200"
            >
              온라인문의
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <a
              id="header-call-btn"
              href="tel:010-4122-7980"
              className="flex items-center gap-2 bg-[#0051e0] text-white px-3.5 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 text-sm cursor-pointer"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              전화상담
            </a>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-colors duration-300 ${
                scrolled
                  ? "border-slate-200 text-slate-800 hover:bg-slate-50"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-slate-900 border-b border-slate-100 shadow-xl px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <div className="text-xs text-slate-400 font-bold border-b border-slate-100 pb-2">서비스 메뉴</div>
            <button
              id="mobile-nav-home"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="text-left font-bold py-1 text-slate-700 hover:text-blue-600"
            >
              홈
            </button>
            <button
              id="mobile-nav-services"
              onClick={() => scrollToSection("services-section")}
              className="text-left font-bold py-1 text-slate-700 hover:text-blue-600"
            >
              주요서비스 소개
            </button>
            <button
              id="mobile-nav-strengths"
              onClick={() => scrollToSection("strengths-section")}
              className="text-left font-bold py-1 text-slate-700 hover:text-blue-600"
            >
              하수구91의 약속
            </button>
            <button
              id="mobile-nav-cases"
              onClick={() => scrollToSection("cases-section")}
              className="text-left font-bold py-1 text-slate-700 hover:text-blue-600"
            >
              시공사례 갤러리
            </button>
            <button
              id="mobile-nav-inquiry"
              onClick={() => scrollToSection("inquiry-section")}
              className="text-left font-bold py-1 text-slate-700 hover:text-blue-600"
            >
              실시간 무료상담 신청
            </button>
            <button
              id="mobile-nav-admin"
              onClick={() => {
                setMobileMenuOpen(false);
                onAdminToggle();
              }}
              className="text-left font-bold py-1 text-amber-700 flex items-center gap-1.5"
            >
              <Lock className="w-4.5 h-4.5" />
              {isAdminOpen ? "관리자 모드 종료" : "관리자 시스템 접속"}
            </button>

            <div className="bg-slate-50 rounded-xl p-3 flex flex-col gap-1 text-[11px] text-slate-500 mt-2">
              <div>📞 비상시 24시간 출동: 010-4122-7980</div>
              <div>📍 출장 지역: 전주 전역 (완산구, 덕진구) 및 전북 일대</div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
