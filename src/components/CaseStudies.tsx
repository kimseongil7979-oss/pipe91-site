import React, { useState } from "react";
import { CaseStudy } from "../types";
import { Search, MapPin, Calendar, Clock, CheckCircle, Flame, ArrowRight } from "lucide-react";

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const categories = ["전체", "하수구", "고압세척", "누수탐지", "변기/싱크대"];

  // Realistic Korean plumbing cases
  const caseStudies: CaseStudy[] = [
    {
      id: "case_1",
      title: "전주 효자동 상가 고압세척 - 수십년 묵은 기름 슬러지 완전 해결!",
      category: "고압세척",
      location: "전북 전주시 완산구 효자동 상가밀집지역",
      date: "2026-06-12",
      issue: "1/6층 고기 전문점 주방 싱크대 및 트렌치 배수구 물이 전혀 빠지지 않고, 옆 상가 화장실 바닥으로 누수 및 역류 발생.",
      diagnosis: "배관 CCTV 내시경 점검 결과, 매장 주방에서 흘러나온 돼지기름이 공용 횡주관(75mm 배관) 내부에서 응고되어 약 5미터 구간이 단단한 석회질처럼 돌덩이로 변해 통로가 95% 이상 꽉 막혀 있는 상태.",
      solution: "일반 스프링 관통기로는 관통 불가능하다고 진단. 엔진형 250bar 초고압 세척기 장비를 세팅하고, 특수 황동 역회전 회전 노즐을 진입시켜 단단한 고체 기름 덩어리를 잘게 부수고 씻어내는 세척 작업 수행. 동시에 하류 메인 집수조에서 쏟아지는 슬러지 찌꺼기를 안전히 회수한 뒤, HD 내시경을 재투입하여 새 배관처럼 완벽히 이물질이 제거된 백색 배관 내부 확인.",
      duration: "약 3시간 소요",
      guarantee: "공용 배관 무상 A/S 1년 보증",
      beforeImg: "https://picsum.photos/seed/sewage_clog_before/800/600",
      afterImg: "https://picsum.photos/seed/sewage_clean_after/800/600",
      toolsUsed: ["엔진형 고압 세척기", "황동 고압 노즐", "배관 내시경 카메라"]
    },
    {
      id: "case_2",
      title: "송천동 현대아파트 싱크대 배관 역류 뚫음 작업",
      category: "하수구",
      location: "전북 전주시 덕진구 송천동 아파트",
      date: "2026-06-20",
      issue: "싱크대 아래 마루 바닥이 젖고 물을 쓸 때마다 밑에서 역류하여 고약한 악취와 마루 변색 발생.",
      diagnosis: "싱크대 하부 호스 진입구 하단 배관 초입에 기름 찌꺼기와 섬유 유연제 성분이 굳어진 유지방 덩어리 적체.",
      solution: "석션기를 사용하여 입구 부근의 액상 이물질과 찌꺼기를 역흡입하여 회수한 후, 최신 플렉스 샤프트(밀링 장비)를 투입하여 배관 내부 벽면에 밀착된 딱딱한 슬러지를 갈아내어 완전히 스케일링 세척 처리. 작업 완료 후 싱크대에 물을 가득 담아 한 번에 내려보내는 담수 통수 테스트를 5회 이상 수행하여 역류 현상 완벽 종료 확인.",
      duration: "약 1시간 소요",
      guarantee: "동일 부위 무상 A/S 6개월 보증",
      beforeImg: "https://picsum.photos/seed/sink_clog_before/800/600",
      afterImg: "https://picsum.photos/seed/sink_clean_after/800/600",
      toolsUsed: ["리지드 플렉스 샤프트 K9-102", "산업용 초강력 석션기", "배관 검사용 미니 카메라"]
    },
    {
      id: "case_3",
      title: "평화동 단독주택 미세 수도 누수 탐지 및 정밀 보수",
      category: "누수탐지",
      location: "전북 전주시 완산구 평화동 주택",
      date: "2026-06-18",
      issue: "전월 대비 수도 요금이 3배 이상 초과 청구되고, 보일러 컨트롤러에서 12번(물보충 에러코드)이 자주 발생하며 계량기 별침이 미세하게 지속 회전함.",
      diagnosis: "온수 및 냉수 배관 압력 테스트 시행 결과, 온수 배관에서 압력 손실 확인. 질소/수소 혼합가스를 배관에 주입하고 수소 탐지기로 1차 거실 및 다용도실을 탐지하여 다용도실 세탁기 수전 하단 벽면 안쪽 엑셀(XL) 배관의 엘보 꺾임 부위 피로 누적 균열 확인.",
      solution: "최첨단 청음 탐지기를 동원하여 미세 누수음의 중심지점을 밀리미터 단위로 확정. 다용도실 바닥 타일 1장 크기만 최소한으로 정밀 굴착하여 누수 중인 노후 XL 배관 교체 보수 작업 진행. 배관 교체 후 다시 기압을 걸어 추가 누수 없음을 최종 체크한 뒤, 타일 깔끔히 원상 복구 및 메지 미장 마감 처리.",
      duration: "약 4.5시간 소요",
      guarantee: "수리 배관 하자에 대해 2년 책임 보증",
      beforeImg: "https://picsum.photos/seed/leak_locate_before/800/600",
      afterImg: "https://picsum.photos/seed/leak_fix_after/800/600",
      toolsUsed: ["수소 가스식 탐색기", "고정밀 청음 누수탐지기", "타일 정밀 컷팅기"]
    },
    {
      id: "case_4",
      title: "완주 삼례읍 원룸 건물 메인 하수관 막힘 및 변기 물빠짐 역류 구제",
      category: "변기/싱크대",
      location: "전북 완주군 삼례읍 다세대 원룸",
      date: "2026-06-22",
      issue: "원룸 건물 1층 세대에서 화장실 변기를 누르지도 않았는데 역류하고 바닥 하수구로 오물이 뿜어져 올라오는 대형 비상 상황 발생.",
      diagnosis: "건물 외부 메인 맨홀 and 1층 세대 중간의 하부 횡주관 배관 통로 정체. 내시경 검사 결과 세대주가 실수로 버린 물티슈 뭉치와 머리카락, 담배꽁초가 수년간 기름 슬러지와 엉켜 메인 소통 맨홀 입구를 틀어막고 있었음.",
      solution: "외부 맨홀 역방향에서 대형 전동 스프링 청소기를 진입하여 걸려있는 물티슈 뭉치와 머리카락을 1차적으로 강제 인양하여 꺼냄. 이후 세대 내부에서 샤프트 스핀 장비로 배관 안쪽 마감을 스케일링 청소 완료. 2층, 3층 공용 전 세대 통수 테스트 결과 1층으로의 낙하 수압 역류나 오물 넘침 현상이 완벽히 구제 완료됨.",
      duration: "약 2.5시간 소요",
      guarantee: "동일 공용배관 물티슈 수거 관련 6개월 보증",
      beforeImg: "https://picsum.photos/seed/toilet_clog_before/800/600",
      afterImg: "https://picsum.photos/seed/toilet_clean_after/800/600",
      toolsUsed: ["1/2마력 전동 스프링 청소기", "물티슈 수거 특수 체인 헤드", "맨홀 내시경 검사선"]
    }
  ];

  const filteredCases = activeCategory === "전체"
    ? caseStudies
    : caseStudies.filter(c => c.category === activeCategory);

  return (
    <section id="cases-section" className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            하수구91 <span className="text-blue-600">실제 현장 시공사례</span>
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed text-sm md:text-base">
            백 마디 설명보다 완벽한 한 번의 작업 결과로 증명합니다. 
            원인 진단부터 첨단 해결 후 내시경 검증까지, 투명하게 전 과정을 보여드립니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`case-tab-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat === "전체" ? "전체 보기" : `${cat} 시공`}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCases.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all duration-300"
            >
              <div>
                {/* Before / After Images Side by Side representation */}
                <div className="relative h-64 bg-slate-100 flex overflow-hidden">
                  <div className="w-1/2 h-full relative border-r border-white">
                    <img
                      src={study.beforeImg}
                      alt="시공 전 배관 상태"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                      시공 전
                    </div>
                  </div>
                  <div className="w-1/2 h-full relative">
                    <img
                      src={study.afterImg}
                      alt="시공 후 완벽 소통 상태"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                      시공 후 (완료)
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 text-left space-y-4">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200">
                      📂 {study.category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {study.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {study.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{study.location}</span>
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm line-clamp-3 leading-relaxed">
                    <strong>증상 및 요청:</strong> {study.issue}
                  </p>
                </div>
              </div>

              <div className="px-6 md:px-8 pb-8 pt-4 border-t border-slate-100 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {study.toolsUsed.slice(0, 2).map((tool, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
                      🔧 {tool}
                    </span>
                  ))}
                  {study.toolsUsed.length > 2 && (
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-md">
                      +{study.toolsUsed.length - 2}
                    </span>
                  )}
                </div>

                <button
                  id={`case-detail-btn-${study.id}`}
                  onClick={() => setSelectedCase(study)}
                  className="flex items-center gap-1.5 text-xs text-blue-600 font-black hover:underline cursor-pointer"
                >
                  상세 진단결과 보기 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Case study Modal */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 animate-scale-up text-left">
              
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                      {selectedCase.category} 시공 보고서
                    </span>
                    <span className="text-slate-400 text-xs">{selectedCase.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-950">{selectedCase.title}</h3>
                </div>
                <button
                  id="close-case-modal"
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer shrink-0 ml-4"
                >
                  X
                </button>
              </div>

              {/* Before/After Big Visual Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-50 border-b border-slate-100">
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">🔴 시공 전 배관 막힘 상태</span>
                  <div className="h-56 rounded-2xl overflow-hidden shadow-inner">
                    <img src={selectedCase.beforeImg} alt="Clogging screen" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">🟢 시공 후 통수 완벽 스케일링</span>
                  <div className="h-56 rounded-2xl overflow-hidden shadow-inner">
                    <img src={selectedCase.afterImg} alt="Cleaned pipe screen" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6 text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span><strong>위치:</strong> {selectedCase.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span><strong>소요시간:</strong> {selectedCase.duration}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span> 1. 고객 호소 증상 및 피해 상황
                    </h4>
                    <p className="text-slate-600 bg-red-50/20 p-4 rounded-xl border border-red-100/30 leading-relaxed">
                      {selectedCase.issue}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> 2. 첨단 CCTV 내시경 정밀 진단 결과
                    </h4>
                    <p className="text-slate-600 bg-blue-50/20 p-4 rounded-xl border border-blue-100/30 leading-relaxed">
                      {selectedCase.diagnosis}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 3. 하수구91 해결 공법 및 과정
                    </h4>
                    <p className="text-slate-600 bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/30 leading-relaxed">
                      {selectedCase.solution}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl font-bold border border-emerald-100">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>무상 사후보증 보증서 발급: {selectedCase.guarantee}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCase.toolsUsed.map((tool, index) => (
                      <span key={index} className="bg-slate-100 text-slate-700 font-bold text-xs px-3 py-1 rounded-lg">
                        🔧 {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end rounded-b-3xl">
                <button
                  id="case-modal-close-btn"
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 font-bold text-sm cursor-pointer"
                >
                  닫기
                </button>
                <a
                  id="case-modal-call-btn"
                  href="tel:010-4122-7980"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md cursor-pointer"
                >
                  📲 견적 및 출장 신청 바로가기
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
