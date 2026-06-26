import React, { useState, useEffect } from "react";
import { Phone, ArrowRight, FileText, ChevronLeft, ChevronRight, Navigation } from "lucide-react";
import heroImg1 from "../assets/images/korean_leak_tech_30s_1782452208498.jpg";
import heroImg2 from "../assets/images/high_pressure_sewer_cleaning_1782451917818.jpg";
import heroImg3 from "../assets/images/friendly_korean_plumber_30s_1782452329724.jpg";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [heroImg1, heroImg2, heroImg3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const scrollToInquiry = () => {
    const element = document.getElementById("inquiry-section");
    if (element) {
      const offset = 80;
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

  const scrollToServices = () => {
    const element = document.getElementById("services-section");
    if (element) {
      const offset = 80;
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
    <section
      id="hero-section"
      className="relative min-h-screen lg:h-[820px] bg-white flex flex-col lg:flex-row overflow-hidden"
    >
      {/* LEFT COLUMN: Text and circles (light gradient) */}
      <div className="relative w-full lg:w-[55%] pt-28 pb-12 lg:py-0 px-6 sm:px-12 lg:pl-20 lg:pr-10 flex flex-col justify-center bg-gradient-to-tr from-[#e6f4ff]/70 via-[#f5faff]/80 to-white z-10 text-left">
        
        {/* Animated Background Waves (SVG representation) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80">
          <svg
            className="absolute bottom-0 left-0 w-full h-[320px] text-blue-200"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-50 200 C 150 150, 200 280, 400 180 C 500 130, 550 220, 650 170"
              stroke="url(#blue-grad-1)"
              strokeWidth="6"
              strokeLinecap="round"
              className="opacity-40"
            />
            <path
              d="M-20 240 C 180 190, 220 310, 430 210 C 530 160, 570 250, 680 200"
              stroke="url(#cyan-grad-1)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="12 6"
              className="opacity-50"
            />
            <defs>
              <linearGradient id="blue-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0080ff" />
                <stop offset="100%" stopColor="#00dfd8" />
              </linearGradient>
              <linearGradient id="cyan-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#4facfe" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content Elements wrapper */}
        <div className="relative z-10 flex flex-col gap-6 max-w-xl">
          {/* Subtitle / Tagline Badge exactly as the screenshot */}
          <div className="self-start bg-white border border-blue-200/80 rounded-full px-5 py-2 shadow-sm text-xs sm:text-sm font-bold tracking-tight">
            <span className="text-blue-600">전주누수전문업체 </span>
            <span className="text-red-500 font-extrabold ml-1">
              동파 / 해빙 / 언수도녹임 전문!
            </span>
          </div>

          {/* Huge Heading exactly matching screenshot font weight and style */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0f244a] tracking-tighter leading-none mt-2">
            전주누수출장
          </h1>

          {/* Description line as screenshot */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
            각종 <span className="text-red-500 font-bold">누수 문제</span>를 해결해드리며
            <br />
            처음부터 끝까지 책임감을 가지고 최선을 다합니다
          </p>

          {/* Slanted Custom Ribbons Badge Layout exactly like the screenshot */}
          <div className="flex items-center self-start overflow-hidden rounded-md shadow-md mt-2 skew-x-[-12deg]">
            <div className="bg-[#008be5] text-white px-5 py-2.5 font-extrabold text-xs sm:text-sm tracking-wide">
              <div className="skew-x-[12deg]">누수 출장 전문</div>
            </div>
            <div className="bg-[#005fc0] text-white px-5 py-2.5 font-extrabold text-xs sm:text-sm border-l border-white/20 tracking-wide">
              <div className="skew-x-[12deg]">빠른해결</div>
            </div>
            <div className="bg-[#004595] text-white px-5 py-2.5 font-extrabold text-xs sm:text-sm border-l border-white/20 tracking-wide flex items-center gap-1">
              <div className="skew-x-[12deg]">고객감동 100%</div>
            </div>
          </div>

          {/* Three Round Circles with unique designs matching the screenshot */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
            {/* Circle 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#0090ff] to-[#00b8ff] text-white flex flex-col items-center justify-center p-2 shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-white">
                <span className="text-[10px] font-black tracking-widest text-yellow-300 leading-none">01</span>
                <span className="text-xs sm:text-sm font-black mt-1 leading-tight">누수/방수</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-blue-50/90 leading-tight">신속한 해결!</span>
              </div>
            </div>

            {/* Circle 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#0156ff] to-[#0078ff] text-white flex flex-col items-center justify-center p-2 shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-white">
                <span className="text-[10px] font-black tracking-widest text-yellow-300 leading-none">02</span>
                <span className="text-xs sm:text-sm font-black mt-1 leading-tight">수도배관동파</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-blue-50/90 leading-tight">스팀작업!</span>
              </div>
            </div>

            {/* Circle 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#052078] to-[#003fc4] text-white flex flex-col items-center justify-center p-2 shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-white">
                <span className="text-[10px] font-black tracking-widest text-yellow-300 leading-none">03</span>
                <span className="text-xs sm:text-sm font-black mt-1 leading-tight">전주누수업체</span>
                <span className="text-[8px] sm:text-[9px] font-bold text-blue-50/80 leading-tight">완산구 · 덕진구 전북 전역</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Slanted Photo Gallery split exactly like the screenshot */}
      <div className="relative w-full lg:w-[48%] h-[350px] lg:h-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 overflow-hidden bg-slate-100 z-0 select-none">
        
        {/* Slant Angle Split Divider Mask for Large Screens */}
        <div
          className="hidden lg:block absolute inset-0 z-0 overflow-hidden"
          style={{
            clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <div
            className="flex h-full w-[300%] transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentSlide * 100) / 3}%)` }}
          >
            {slides.map((imgSrc, idx) => (
              <div
                key={idx}
                className="w-1/3 h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imgSrc})` }}
              />
            ))}
          </div>
        </div>

        {/* Regular full-cover on mobile */}
        <div className="lg:hidden absolute inset-0 z-0 overflow-hidden">
          <div
            className="flex h-full w-[300%] transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(currentSlide * 100) / 3}%)` }}
          >
            {slides.map((imgSrc, idx) => (
              <div
                key={idx}
                className="w-1/3 h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imgSrc})` }}
              />
            ))}
          </div>
        </div>

        {/* Shadow overlays on image */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 18%)",
          }}
        />

        {/* Left Slider Arrow Overlay */}
        <button
          id="hero-slider-prev"
          onClick={prevSlide}
          className="absolute left-4 lg:left-[18%] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/40 bg-black/10 hover:bg-black/25 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Slider Arrow Overlay */}
        <button
          id="hero-slider-next"
          onClick={nextSlide}
          className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/40 bg-black/10 hover:bg-black/25 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicator Dots at bottom-center of the image */}
        <div className="absolute bottom-12 left-1/2 lg:left-[58%] -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-blue-600 w-6" : "bg-white/60 border border-white/40"
              }`}
              title={`${idx + 1}번 슬라이드`}
            />
          ))}
        </div>

        {/* Scroll Down message */}
        <div className="absolute bottom-4 left-1/2 lg:left-[58%] -translate-x-1/2 z-20 text-white text-[11px] font-bold tracking-wider flex flex-col items-center gap-1 opacity-90 animate-bounce">
          <span>Scroll Down</span>
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Floating Naver Map Icon as in bottom right */}
        <a
          href="https://map.naver.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-[#03c75a] hover:scale-110 active:scale-95 transition-all"
          title="네이버 지도에서 보기"
        >
          <div className="text-[#03c75a] font-extrabold text-lg flex items-center justify-center gap-0.5">
            <span className="font-sans font-black text-xl">N</span>
            <span className="text-[8px] font-bold leading-none tracking-tight">지도</span>
          </div>
        </a>
      </div>

      {/* Floating Red Square Tab on the Right Side Edge: 무료상담신청 exactly as the screenshot */}
      <div className="fixed right-0 top-1/3 -translate-y-1/2 z-40 bg-[#e31837] text-white pl-3.5 pr-2 py-4 rounded-l-xl shadow-2xl flex flex-col items-center gap-2 font-bold text-xs tracking-tight hover:bg-red-700 transition-all cursor-pointer group hover:pl-5 select-none"
        onClick={scrollToInquiry}
      >
        <FileText className="w-5 h-5 text-white animate-pulse" />
        <span className="writing-mode-vertical text-center tracking-widest text-[11px] font-black">
          무료상담신청
        </span>
      </div>
    </section>
  );
}
