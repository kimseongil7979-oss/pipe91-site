import React, { useState, useEffect } from "react";
import { Inquiry } from "../types";
import { Lock, FileText, CheckCircle, XCircle, Phone, Clock, Search, RefreshCw, Layers } from "lucide-react";

export default function AdminPanel() {
  const [authCode, setAuthCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authCode !== "9191") {
      setErrorMsg("관리자 인증 코드가 일치하지 않습니다. (힌트: 9191)");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setInquiries(data.inquiries || []);
        setIsAuthenticated(true);
      } else {
        setErrorMsg(data.error || "인증 정보를 확인할 수 없습니다.");
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
      setErrorMsg("서버 통신 실패. 비밀번호를 다시 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authCode: "9191" }), // auto refresh using valid code
      });
      const data = await response.json();
      if (response.ok) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'completed' | 'canceled') => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authCode: "9191", status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      } else {
        alert("상태 수정 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert("서버 통신 중 장애가 발생했습니다.");
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "전체" ||
      (statusFilter === "대기중" && inq.status === "pending") ||
      (statusFilter === "처리완료" && inq.status === "completed") ||
      (statusFilter === "상담취소" && inq.status === "canceled");

    return matchesSearch && matchesStatus;
  });

  // Calculate dashboard numbers
  const totalInquiries = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === "pending").length;
  const completedCount = inquiries.filter((i) => i.status === "completed").length;
  const canceledCount = inquiries.filter((i) => i.status === "canceled").length;

  return (
    <section id="admin-panel-section" className="py-24 bg-slate-100 min-h-screen text-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-extrabold text-sm uppercase tracking-wider bg-amber-50 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
            Manager Mode
          </span>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight">
            하수구91 <span className="text-blue-600">고객 실시간 상담관리</span> 시스템
          </h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            고객들이 신청서에 작성한 견적 및 문의 내역을 모바일과 PC에서 실시간으로 확인하고 보수 일정을 기록 및 관리할 수 있습니다.
          </p>
        </div>

        {!isAuthenticated ? (
          /* Password Form */
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-extrabold text-center text-slate-900 mb-2">관리자 보안 로그인</h3>
            <p className="text-slate-500 text-xs text-center mb-6">
              상담 내역 조회를 위해 하수구91 지정 관리자 인증 암호를 입력하세요.
            </p>

            {errorMsg && (
              <div className="bg-rose-50 text-rose-700 p-3.5 rounded-xl text-xs font-bold border border-rose-100 mb-4 text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-extrabold text-slate-600">인증 코드 입력</label>
                <input
                  id="admin-auth-input"
                  type="password"
                  placeholder="관리자 코드를 입력하세요 (9191)"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-center text-sm text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <button
                id="admin-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer shadow-md"
              >
                {isLoading ? "인증 로딩 중..." : "시스템 보안 로그인"}
              </button>
            </form>
          </div>
        ) : (
          /* Actual Dashboard */
          <div className="space-y-8 animate-fade-in">
            
            {/* Dashboard widgets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400">총 견적 신청</span>
                  <div className="text-2xl font-black mt-1">{totalInquiries}건</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400">전화대기 / 대기중</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">{pendingCount}건</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400">처리 및 통수완료</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">{completedCount}건</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400">예약 취소 / 연기</span>
                  <div className="text-2xl font-black text-slate-400 mt-1">{canceledCount}건</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center font-bold">
                  <XCircle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter and search controllers */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-search-input"
                  type="text"
                  placeholder="고객명, 연락처, 주소, 상세내용 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-10 text-xs sm:text-sm text-slate-800 outline-none focus:bg-white focus:border-blue-500 transition-all"
                />
              </div>

              {/* Status Filter buttons & Refresh */}
              <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3 shrink-0">
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {["전체", "대기중", "처리완료", "상담취소"].map((filter) => (
                    <button
                      key={filter}
                      id={`status-filter-${filter}`}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        statusFilter === filter
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <button
                  id="admin-refresh-btn"
                  onClick={refreshInquiries}
                  disabled={isLoading}
                  className="p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-all cursor-pointer shrink-0"
                  title="새로고침"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                </button>
              </div>

            </div>

            {/* Inquiries List */}
            <div className="space-y-4">
              {filteredInquiries.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 text-slate-400 flex flex-col items-center justify-center">
                  <FileText className="w-12 h-12 text-slate-300 mb-3" />
                  <span className="text-sm font-bold">접수된 실시간 상담 내역이 없습니다.</span>
                  <span className="text-xs mt-1 text-slate-400">검색어 필터를 변경해 보세요.</span>
                </div>
              ) : (
                filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-white rounded-2xl border p-6 flex flex-col lg:flex-row justify-between gap-6 hover:shadow-md transition-shadow relative overflow-hidden ${
                      inq.status === "completed"
                        ? "border-l-4 border-l-emerald-500 border-slate-200"
                        : inq.status === "canceled"
                        ? "border-l-4 border-l-slate-300 border-slate-200 opacity-65"
                        : "border-l-4 border-l-amber-500 border-slate-200 bg-amber-50/5"
                    }`}
                  >
                    
                    {/* Inquiry info */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-base text-slate-900">{inq.name} 고객님</span>
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-black px-2 py-0.5 rounded-md">
                          🏷️ {inq.serviceType}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(inq.createdAt).toLocaleString("ko-KR")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-500" />
                          <span>연락처: <strong className="text-slate-900">{inq.phone}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>📍 주소/지역: <strong className="text-slate-900">{inq.address}</strong></span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed text-left">
                        <strong className="block text-slate-800 text-[11px] font-bold mb-1">📝 요청 및 고장 증상:</strong>
                        {inq.details}
                      </div>
                    </div>

                    {/* Controller action panel */}
                    <div className="flex lg:flex-col items-start lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 shrink-0">
                      
                      {/* Action status tags */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-slate-400">상태 관리:</span>
                        {inq.status === "pending" && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                            대기 중 (전화예정)
                          </span>
                        )}
                        {inq.status === "completed" && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                            시공완료 (정리)
                          </span>
                        )}
                        {inq.status === "canceled" && (
                          <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                            취소됨
                          </span>
                        )}
                      </div>

                      {/* Control buttons */}
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        <a
                          id={`admin-call-${inq.id}`}
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" /> 통화걸기
                        </a>

                        {inq.status !== "completed" && (
                          <button
                            id={`admin-complete-${inq.id}`}
                            onClick={() => handleUpdateStatus(inq.id, "completed")}
                            className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer"
                          >
                            시공완료 처리
                          </button>
                        )}

                        {inq.status !== "canceled" && (
                          <button
                            id={`admin-cancel-${inq.id}`}
                            onClick={() => handleUpdateStatus(inq.id, "canceled")}
                            className="flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-bold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer"
                          >
                            상담취소
                          </button>
                        )}
                        
                        {inq.status !== "pending" && (
                          <button
                            id={`admin-reset-${inq.id}`}
                            onClick={() => handleUpdateStatus(inq.id, "pending")}
                            className="flex items-center gap-1 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 font-bold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer"
                          >
                            대기로 복원
                          </button>
                        )}
                      </div>

                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
