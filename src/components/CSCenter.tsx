import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Phone, MessageSquare, MapPin, Building2, ExternalLink } from "lucide-react";
import toolsImg from "../assets/images/plumbing_tools_pro_1782451479624.jpg";

export default function CSCenter() {
  const [activeSlide, setActiveSlide] = useState(0);

  const cards = [
    {
      id: "notice",
      icon: <MessageSquare className="w-10 h-10 text-slate-700 stroke-[1.5]" />,
      title: "공지사항",
      description: '"전주누수출장"에서 알려드립니다.',
      subText: "24시간 긴급 누수 탐지 및 배관 고압세척 실시간 접수 중입니다. 전북 완산구, 덕진구 및 인근 전역 상시 출장 배차 대기 중입니다.",
    },
    {
      id: "location",
      icon: <MapPin className="w-10 h-10 text-slate-700 stroke-[1.5]" />,
      title: "오시는길",
      description: "전라북도 전주시 완산구 홍산중앙로 (효자동)",
      subText: "전주 우체국 인근 신속 출장 본부 위치. 고객이 원하시는 모든 전주 및 전북 일대에 30분 내로 신속 도달 서비스를 보장합니다.",
    },
    {
      id: "about",
      icon: <Building2 className="w-10 h-10 text-slate-700 stroke-[1.5]" />,
      title: "업체소개",
      description: "전주누수출장 홈페이지 방문에 감사합니다.",
      subText: "정식 면허를 소지한 전문 설비 기업으로서 누수 한 방울까지 정밀 탐지하여 투명한 공정 가격 및 완벽한 책임 A/S를 제공합니다.",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section id="cs-section" className="py-20 bg-[#f0f2f5] border-t border-slate-200 relative text-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Title */}
        <div className="space-y-3 mb-12">
          <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-wider">
            CS CENTER
          </h3>
          <a
            href="tel:010-4122-7980"
            className="block text-4xl sm:text-5xl md:text-6xl font-black text-[#0051e0] tracking-tight hover:underline transition-all duration-200 select-all"
          >
            010-4122-7980
          </a>
        </div>

        {/* Dynamic Image & Card Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          
          {/* Left Side: Newly Generated High-Tech Image (Responsive) */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-xl shadow-md border border-slate-200 bg-white flex flex-col justify-between">
            <div className="relative h-64 lg:h-full overflow-hidden">
              <img
                src={toolsImg}
                alt="전주누수출장 첨단 배관 내시경 및 탐지 장비"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 bg-[#0051e0] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                정밀 누수 진단 첨단 장비 보유
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                <p className="text-xs text-blue-200 font-bold uppercase tracking-wider">State-of-the-Art Equipment</p>
                <h4 className="text-lg font-extrabold tracking-tight mt-0.5">
                  디지털 내시경 & 청음 가스 탐지기 보유
                </h4>
              </div>
            </div>
          </div>

          {/* Right Side: Sliding Cards Carousel */}
          <div className="lg:col-span-7 flex flex-col justify-between relative bg-transparent py-4">
            
            {/* Slider Navigation controls & Cards list */}
            <div className="relative flex items-center w-full justify-between gap-4">
              
              {/* Left Arrow */}
              <button
                id="cs-prev-btn"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm transition-all cursor-pointer shrink-0 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Cards wrapper (Interactive responsive display) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
                {/* Desktop layout: shows all 3 cards. Mobile layout: highlights activeSlide */}
                {cards.map((card, index) => {
                  const isActiveOnMobile = index === activeSlide;
                  return (
                    <div
                      key={card.id}
                      className={`bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[250px] transition-all duration-300 ${
                        isActiveOnMobile
                          ? "flex scale-100 opacity-100"
                          : "hidden md:flex md:opacity-90 hover:opacity-100 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-700">
                          {card.icon}
                        </div>
                        {/* Heading */}
                        <div>
                          <h4 className="text-base font-black text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5 flex justify-between items-center">
                            {card.title}
                            <span className="text-[10px] text-slate-400 font-normal">0{index + 1}</span>
                          </h4>
                          <p className="text-xs font-bold text-slate-800 leading-normal line-clamp-2">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-4 leading-relaxed line-clamp-3">
                        {card.subText}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                id="cs-next-btn"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm transition-all cursor-pointer shrink-0 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicators for mobile */}
            <div className="flex md:hidden justify-center items-center gap-1.5 mt-6">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeSlide ? "bg-[#0051e0] w-6" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
