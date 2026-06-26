import React from "react";
import { Clock, ShieldAlert, Award, Sparkles, CheckSquare, HeartHandshake } from "lucide-react";

export default function Strengths() {
  const promises = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "24시 신속 출동 서비스",
      description: "전주시 전역 및 전북 완주 등 인근 지역에 분산 대기 중인 전문 베테랑 기사님들이 전화 즉시 상시 출장 배차됩니다. 긴급 역류 및 야간 고장 발생 시에도 걱정 마세요."
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
      title: "못 뚫으면 비용 0원 보장",
      description: "타 업체가 실패하고 간 최고 난이도 하수관 및 횡주관도 하수구91은 끝까지 해결합니다. 만에 하나 우리 과실이나 장비 한계로 해결하지 못하면 출장비와 작업 비용을 절대 받지 않습니다."
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-500" />,
      title: "부당 추가요금 없는 정찰제",
      description: "현장에서 배관 상태를 내시경으로 함께 정밀 확인한 후, 예상 견적을 확정하고 작업을 시작합니다. 동의 없는 추가 수리나 부당한 바가지 과다 청구를 일절 금지합니다."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      title: "첨단 HD 배관장비 보유",
      description: "최신 플렉스 샤프트, 초고압 세척기, Sonde 관로 위치 추적기, 고해상도 CCTV 내시경 등 수백만 원 대의 첨단 수입 장비를 정식 보유 및 직접 운용하여 배관 파손 없는 무결점 시공을 약속합니다."
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-violet-500" />,
      title: "정식 A/S 기간 보증",
      description: "동일한 구간 배관 슬러지로 인해 단기 내에 재막힘이나 불량이 발생할 경우, 확실하게 무상 보증 수리를 처리해 드립니다. 한 번 맺은 인연은 사후 관리까지 책임집니다."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-indigo-500" />,
      title: "20년 신뢰의 베테랑 경력",
      description: "단순히 물길만 트고 철수하는 일반 야매 업자와 달리, 수많은 대형 빌딩 메인 횡주관 배관 통수 및 대형 누수 공사를 집행한 20년 내공의 전문가들이 정밀 기술력을 선사합니다."
    }
  ];

  return (
    <section id="strengths-section" className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Visual accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 text-left">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              왜 수많은 전주·전북 고객님들이 <br />
              <span className="text-blue-600">하수구91</span>을 다시 찾으실까요?
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-slate-500 text-sm md:text-base leading-relaxed text-left">
              하수구91은 오직 실력과 투명성, 그리고 정직한 견적만을 고집합니다. 
              내 집 하수구를 고친다는 마음으로, 기름 슬러지 돌덩이부터 미세 누수까지 
              첨단 기술력과 최상의 친절로 완벽하게 해결해 드릴 것을 약속합니다.
            </p>
          </div>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((promise, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-xl p-8 hover:bg-blue-50/40 transition-colors duration-250 flex flex-col items-start gap-5 group"
            >
              <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm transition-transform duration-300">
                {promise.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {promise.title}
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {promise.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* High Conversion Seal Row */}
        <div className="mt-16 bg-slate-900 border border-slate-800 rounded-xl p-8 md:p-12 text-white text-left relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 translate-x-1/4 translate-y-1/4 blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="bg-white/10 text-white border border-white/20 text-[11px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                하수구91 안심 출장 서약
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                "못 뚫으면 0원, 작업 전 100% 투명한 정찰가 고지"
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
                출장만 가고 요금을 받아 챙기거나, 임시방편으로 대충 뚫어 일주일 뒤 다시 막히게 하는 눈속임 시공을 절대 배척합니다. 
                고객님이 시공 과정을 눈으로 보실 수 있게 설명해 드리며, 시원하게 통수되지 않을 경우 단 1원도 요구하지 않겠습니다.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                id="strengths-seal-call"
                href="tel:010-4122-7980"
                className="inline-flex items-center gap-3 bg-white text-slate-900 font-extrabold text-base px-8 py-4 rounded-xl shadow-lg hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                📞 신속 안심 출장 상담 신청
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
