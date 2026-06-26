import React, { useState } from "react";
import { Wrench, Waves, Search, Flame, Eye, Sparkles, CheckCircle2, ArrowRight, X, Phone } from "lucide-react";

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  process: string[];
  tools: string[];
  badge?: string;
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: "clog",
      icon: <Wrench className="w-8 h-8 text-blue-500" />,
      title: "하수구 및 싱크대 막힘",
      description: "화장실, 욕실 하수구 막힘, 아파트 싱크대 역류, 메인 공용 배관 소통 작업을 첨단 샤프트 및 흡입 장비로 배관 파손 없이 이물질만 분쇄 및 제거합니다.",
      price: "기본 작업 50,000원 ~",
      badge: "가장 인기",
      process: [
        "1. 현장 방문 후 정확한 막힘 원인 점검",
        "2. 배관 내시경을 통한 이물질 상태 파악",
        "3. 플렉스 샤프트 또는 석션기로 원인 제거 (기름 슬러지, 머리카락 등 분쇄)",
        "4. 통수 테스트 및 내시경으로 완벽 해결 검증"
      ],
      tools: ["초고속 플렉스 샤프트 (Flex Shaft)", "초강력 석션기 (Rigid Vacuum)", "스프링 소통기"]
    },
    {
      id: "jetting",
      icon: <Waves className="w-8 h-8 text-sky-500" />,
      title: "배관 고압세척 (Premium)",
      description: "일반 스프링이나 샤프트로 뚫리지 않는 슬러지 덩어리와 흙모래, 석회질을 초고압 물 분사 장비를 사용하여 배관 내부를 새것처럼 완벽하게 세척 복원합니다.",
      price: "별도 견적 상담 (초특가 보장)",
      badge: "근본적 해결",
      process: [
        "1. 고압세척 특수 노즐 장비 세팅 및 작업선 진입",
        "2. 배관 내부에서 150~250bar 고압수 역회전 분사",
        "3. 수십 년 묵은 기름 돌덩이(석회) 분쇄 후 슬러지 흡입 및 배출",
        "4. 내시경 검사를 통해 백색의 완벽한 배관 내부 확인"
      ],
      tools: ["엔진형 초고압 세척기 (150-250bar)", "특수 회전 및 황동 관통 노즐", "내시경 모니터"]
    },
    {
      id: "leak",
      icon: <Search className="w-8 h-8 text-emerald-500" />,
      title: "누수 탐지 및 정밀 공사",
      description: "수도요금이 급증하거나 밑에 집 천장에서 물이 샐 때, 첨단 가스식 및 청음식 정밀 누수 탐지 장비로 불필요한 굴착 없이 오차 범위 10cm 이내에서 완벽히 누수 지점을 탐색 및 보수합니다.",
      price: "기본 탐색 150,000원 ~",
      badge: "정밀 탐지",
      process: [
        "1. 배관 공기압 및 가스 배합 테스트로 누수 구간 압축",
        "2. 가스식 탐지기로 배관 누수 의심 구간 정밀 진단",
        "3. 초정밀 청음기(소리 분석)로 정확한 누수 지점 핀포인트 확정",
        "4. 최소 부분 굴착 후 특수 배관 용접 및 복구, 미장 마감"
      ],
      tools: ["수소/질소 가스 탐지기", "디지털 청음식 누수탐지기", "수압 압력 게이지"]
    },
    {
      id: "toilet",
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      title: "변기 및 소변기 막힘 수리",
      description: "장난감, 플라스틱, 물티슈, 음식물 등이 들어가 꽉 막힌 변기와 역류하는 소변기를 신속하게 압력 관통기 및 석션 장비로 손상 없이 이물질을 뽑아냅니다. 필요시 위생도기 교체도 함께 진행합니다.",
      price: "변기 관통 50,000원 ~",
      process: [
        "1. 변기 막힘 이물질의 종류(수용성/비수용성) 분석",
        "2. 특수 관통기로 가벼운 막힘 해결 또는 강력 흡입기로 이물질 강제 회수",
        "3. 비수용성 물질 삽입 시 변기 탈거 후 안전 회수 (변기 파손 절대 없음)",
        "4. 수평 재조정, 바이오 실리콘 및 백시멘트 깔끔한 재시공 마감"
      ],
      tools: ["강력 리지드 관통기", "산업용 초고밀도 석션 장비", "바이오 실란트/백시멘트"]
    },
    {
      id: "endoscopy",
      icon: <Eye className="w-8 h-8 text-indigo-500" />,
      title: "배관 CCTV 내시경 & 관로탐지",
      description: "배관 내부가 깨지거나 내려앉았는지 육안으로 확인할 수 없을 때, 산업용 내시경 카메라를 배관 깊숙이 투입해 균열, 구배 불량, 이물질 위치를 HD 모니터로 정밀 촬영 진단합니다.",
      price: "내시경 검사 50,000원 ~",
      process: [
        "1. 배관 투입구에 고해상도 LED 내시경 카메라 장착",
        "2. 실시간 모니터링을 통해 균열, 처짐, 기름 석회 위치 상세 촬영",
        "3. 관로 송신기로 땅속 배관의 실제 위치와 깊이를 지상에서 탐지 (정밀 굴착 지원)",
        "4. 원인 파악 결과를 고객님께 영상으로 설명 및 작업 방향 제안"
      ],
      tools: ["산업용 30M/50M HD 배관 내시경", "배관 위치 추적기 (Sonde/Locator)", "녹화용 모니터링 모듈"]
    }
  ];

  return (
    <section id="services-section" className="py-24 bg-slate-50 border-t border-slate-200 relative text-left">
      <div className="max-w-7xl mx-auto px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3">
            핵심 전문 서비스안내
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            하수구91의 <span className="text-blue-600">핵심 전문 배관설비</span> 서비스
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed text-sm md:text-base">
            20년 이상의 실무 베테랑 기사들이 고가의 최첨단 탐지 및 통수 장비를 직접 운용하여, 
            어떤 꽉 막힌 배관이나 미세 누수도 파손 없이 근본적인 해결책을 제공합니다.
          </p>
        </div>

        {/* Services Grid (Geometric Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 hover:bg-blue-50/40 transition-colors duration-350 p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              {service.badge && (
                <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
                  {service.badge}
                </span>
              )}

              <div>
                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center transition-all duration-300 mb-6 border border-slate-200/60 text-blue-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed line-clamp-4">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-slate-900 font-extrabold text-sm">{service.price}</span>
                <button
                  id={`srv-detail-btn-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:underline transition-all cursor-pointer"
                >
                  자세히 보기 <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Quick Consultation Highlight Card in Bento Grid */}
          <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col justify-between border border-slate-800 relative overflow-hidden">
            <div>
              <span className="text-xs bg-white/10 text-blue-100 border border-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-block mb-4">
                무료 전화 견적
              </span>
              <h3 className="text-2xl font-black leading-tight text-white">
                원하는 시공의 <br />대략적인 가격이 궁금한가요?
              </h3>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                배관 상태나 길이를 대략적으로 설명해 주시면, 과잉 요금 없이 친절히 전화로 즉시 예상 가격 범위를 말씀해 드립니다.
              </p>
            </div>
            <div className="mt-8">
              <a
                id="services-grid-call"
                href="tel:010-4122-7980"
                className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-6 py-3.5 rounded-lg shadow-md hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Phone className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
                010-4122-7980 바로전화
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Modal Popup for selected service */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-scale-up">
              
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">{selectedService.title}</h3>
                    <span className="text-xs text-blue-600 font-black tracking-wider uppercase">{selectedService.price}</span>
                  </div>
                </div>
                <button
                  id="close-service-modal"
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> 서비스 상세 설명
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {selectedService.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> 표준 시공 프로세스 (4단계)
                  </h4>
                  <div className="space-y-2">
                    {selectedService.process.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-blue-50/20 px-4 py-3 rounded-xl border border-blue-50/50">
                        <CheckCircle2 className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-slate-600 font-semibold">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> 사용 전문 장비
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.tools.map((tool, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                        🔧 {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
                  <span className="text-base">⚠️</span>
                  <div>
                    <strong className="font-extrabold block mb-0.5">안내 사항</strong>
                    기본 단가는 배관 환경에 따라 다르며, 세척이나 탈거 등 추가 작업이 동반될 경우 고객님께 미리 가격을 고지하고 컨펌을 받은 후 작업을 수행합니다. 과다 청구나 무단 수리를 절대 하지 않습니다.
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 justify-end rounded-b-3xl">
                <button
                  id="modal-close-secondary"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 font-bold text-sm cursor-pointer"
                >
                  취소 / 닫기
                </button>
                <a
                  id="modal-call-btn"
                  href="tel:010-4122-7980"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-white animate-pulse" />
                  010-4122-7980 즉시 전화 문의
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
