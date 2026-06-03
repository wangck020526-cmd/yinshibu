/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { ROLES_DATA, MEMBERS_DATA } from "../data";
import { Search, UserCheck, BarChart3, Shield, Star, BookOpen, Layers } from "lucide-react";

interface RoleDetailsProps {
  selectedRoleId: string;
  onSelectRole: (id: string) => void;
}

export default function RoleDetails({ selectedRoleId, onSelectRole }: RoleDetailsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("全部部门");
  const roleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const departments = ["全部部门", "管理层", "统筹及创作", "技术制作层", "质控及运营"];

  // Helper to map roles to custom UI departments
  const getCategorizedDept = (dept: string) => {
    if (dept === "管理层") return "管理层";
    if (dept === "影视运营及统筹" || dept === "艺术创作与把控") return "统筹及创作";
    if (dept === "AIGC创制部" || dept === "中后剪辑与包装") return "技术制作层";
    return "质控及运营";
  };

  // Filter roles based on selected category and search input
  const filteredRoles = ROLES_DATA.filter((role) => {
    const matchesDept =
      selectedDept === "全部部门" || getCategorizedDept(role.department) === selectedDept;

    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      role.title.toLowerCase().includes(lowerQuery) ||
      role.department.toLowerCase().includes(lowerQuery) ||
      role.members.some((m) => m.toLowerCase().includes(lowerQuery)) ||
      role.responsibilities.some((r) => r.toLowerCase().includes(lowerQuery));

    return matchesDept && matchesSearch;
  });

  // Automatically scroll & flash the selected role if modified from tree
  useEffect(() => {
    if (selectedRoleId && roleRefs.current[selectedRoleId]) {
      roleRefs.current[selectedRoleId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedRoleId]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Segment Header */}
      <div className="mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 tracking-wider uppercase">
            Responsibilities Directory
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">
            岗位范围与工作责任明细
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            详细记录影视组岗位工作边界、输出标准，通过上方树状图点击或下方搜索查询。
          </p>
        </div>

        {/* Searching Input */}
        <div className="relative w-full xl:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索姓名、职责关键字..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs placeholder:text-slate-400 hover:bg-slate-50/50 transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              selectedDept === dept
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-200"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Grid of Responsibility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => {
          const isSelected = selectedRoleId === role.id;
          return (
            <div
              key={role.id}
              ref={(el) => {
                roleRefs.current[role.id] = el;
              }}
              onClick={() => onSelectRole(role.id)}
              className={`transform transition-all duration-300 rounded-xl p-6 border text-left cursor-pointer relative bg-white overflow-hidden ${
                isSelected
                  ? "ring-3 ring-blue-500/20 border-blue-600 shadow-md scale-[1.01]"
                  : "border-slate-200 hover:border-slate-350 shadow-sm hover:shadow"
              }`}
            >
              {/* Highlight Ribbon */}
              {isSelected && (
                <div className="absolute top-0 right-0 py-0.5 px-3 bg-blue-600 text-white text-[10px] font-bold rounded-bl-lg uppercase tracking-widest animate-pulse">
                  Active Focus
                </div>
              )}

              {/* Department badge & Category title */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wide border border-slate-150">
                  {role.department}
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  YYDS影视组 · 成员
                </span>
              </div>

              {/* Role Title and Name */}
              <div className="mb-4">
                <h3 className="text-lg font-extrabold text-slate-800">{role.title}</h3>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-xs text-slate-400 font-medium">担当干员:</span>
                  {role.members.map((name, i) => {
                    const memberMatch = MEMBERS_DATA.find((m) => m.name === name);
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          memberMatch ? memberMatch.color : "bg-blue-10 w text-blue-700"
                        }`}
                      >
                        <UserCheck className="w-3 h-3" />
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Work Scope / Details */}
              <div className="space-y-3 mb-5">
                <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  工作职责与分工细则
                </div>
                <div className="space-y-2.5">
                  {role.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Indicator */}
              {role.performanceKPI && (
                <div className="pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 px-6 pb-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                    <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                    业绩考核与产出指标 (KPI)
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed bg-amber-50 border border-amber-100 px-2.5 py-1.5 rounded-lg w-full">
                      {role.performanceKPI}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
          <div className="text-slate-300 text-5xl mb-3 font-light">🔍</div>
          <p className="text-slate-500 text-sm font-medium">
            没有找到与&ldquo;{searchQuery}&rdquo;匹配的职位或干员职责。
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDept("全部部门");
            }}
            className="text-xs text-blue-600 font-bold underline mt-2 hover:text-blue-800"
          >
            清除搜索条件
          </button>
        </div>
      )}
    </div>
  );
}
