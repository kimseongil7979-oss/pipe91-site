import React, { useState } from "react";
import { Send, PhoneCall, CheckCircle, Sparkles, User, FileText, MapPin, ChevronDown } from "lucide-react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("하수구 막힘");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !serviceType) {
      setErrorMsg("이름, 연락처, 서비스 유형은 반드시 입력하셔야 합니다.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          serviceType,
          address,
          details,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSuccess(true);
        // Reset form
        setName("");
        setPhone("");
        setAddress("");
        setDetails("");
      } else {
        setErrorMsg(data.error || "서버 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error("Inquiry submission failed:", err);
      setErrorMsg("상담 신청 중 오류가 발생했습니다. 대표 전화 010-4122-7980으로 바로 연락해 주셔도 됩니다!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = ["하수구 막힘", "배관 고압세척", "누수 탐지 및 공사", "변기 / 싱크대 수리", "배관 CCTV 내시경", "기타 배관 설비공사"];

  return (
    <section id="inquiry-section" className="py-24 bg-gradient-to-br from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Visual background enhancements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Callouts and information */}
        <div className="lg:col-span-5 text-left space-y-6">
          <span className="text-blue-400 font-extrabold text-sm uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full inline-block">
            Quick Estimate
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            1분 간편 <span className="text-blue-400">온라인 견적 및 상담</span> 신청
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            막힘 상태나 누수 증상을 간략히 적어 제출해 주시면, 
            배관설비 대표 기술자가 신청 내역을 분석하여 <strong>10분 이내에 신속하게 해법과 예상 견적</strong>을 전화로 안내해 드립니다.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">즉시 연결 직통 전화</h4>
                <p className="text-xs text-slate-400 mt-0.5">긴급 출동이나 즉시 통화를 원하시면 언제든지 010-4122-7980으로 바로 연락 주세요.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">상담비 및 출장비 0원 서약</h4>
                <p className="text-xs text-slate-400 mt-0.5">상담 및 사전 진단은 100% 무상으로 진행되며, 현장 확인 후 뚫지 못할 경우 출장비도 받지 않습니다.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center lg:text-left">
            <span className="text-xs text-slate-400 block mb-1">상시 대기 전화 (휴일/야간 가능)</span>
            <a href="tel:010-4122-7980" className="text-2xl sm:text-3xl font-black text-blue-400 hover:underline">
              010-4122-7980
            </a>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 md:p-10 shadow-2xl relative">
            
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-scale-up">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg border border-emerald-500/30">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">무료 상담 신청 완료!</h3>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-md mx-auto">
                    접수해주신 상담 내역이 대표 기사님께 실시간으로 전송되었습니다. 
                    검토 후 **10분 이내**에 고객님의 연락처로 직접 전화하여 자세한 견적과 해결 방안을 안내해 드리겠습니다. 감사합니다!
                  </p>
                </div>
                <button
                  id="reset-form-btn"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer"
                >
                  새로 상담 신청하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  ✍️ 간편 무료견적 신청서
                </h3>
                
                {errorMsg && (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-300 text-xs">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">
                      성함 / 업체명 <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        id="inq-name-input"
                        type="text"
                        placeholder="예: 홍길동"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">
                      연락처 <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <PhoneCall className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        id="inq-phone-input"
                        type="tel"
                        placeholder="예: 010-1234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Type Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">
                      서비스 유형 <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="inq-service-select"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                      >
                        {services.map((srv) => (
                          <option key={srv} value={srv} className="bg-slate-900 text-white">
                            {srv}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Address Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">
                      작업 희망 지역 / 주소
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        id="inq-address-input"
                        type="text"
                        placeholder="예: 전주 효자동 또는 덕진구 송천동"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Details Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    증상 및 상세 내용
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                    <textarea
                      id="inq-details-textarea"
                      rows={4}
                      placeholder="막힌 곳의 세부 상황이나 배관 이상 증상을 설명해 주세요. (예: 싱크대 밑 바닥에서 물이 흘러나옵니다, 화장실 변기가 장난감 때문에 안 내려갑니다 등)"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  id="inq-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-extrabold text-base py-4 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                  {isSubmitting ? "실시간 전송 중..." : "무료 상담 및 견적 신청서 전송"}
                </button>

                <div className="text-[10px] text-slate-500 text-center">
                  * 하수구91은 개인정보보호법을 준수하며, 수집된 성함 및 연락처 정보는 배관 시공 상담 목적 이외에 마케팅이나 제3자 제공을 일절 하지 않습니다.
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
