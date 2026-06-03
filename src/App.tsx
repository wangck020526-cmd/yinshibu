/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import OrgTree from "./components/OrgTree";
import RoleDetails from "./components/RoleDetails";
import Workflow from "./components/Workflow";
import { Users, FileHeart, Award, BarChart3, ShieldCheck, Mail, Globe, Clock, LayoutGrid, Printer, Download, ExternalLink, X, HelpCircle, FileText, Loader2, Sparkles } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("gm");
  const [showPrintGuide, setShowPrintGuide] = useState<boolean>(false);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<string>("");

  const handleSelectRole = (id: string) => {
    setSelectedRoleId(id);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn("Direct window.print() was blocked by sandbox: ", e);
    }
    setShowPrintGuide(true);
  };

  const handleDirectPDFExport = async () => {
    if (isExportingPDF) return;
    setIsExportingPDF(true);
    setExportProgress("正在初始化 A4 矢量 PDF 渲染引擎...");

    try {
      // Create new Portrait PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Helper for clean enterprise PDF header and borders
      const drawFrame = (title: string, pageNo: number) => {
        // Top header bar
        pdf.setFillColor(37, 99, 235); // Blue 600
        pdf.rect(12, 10, 186, 1.5, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(30, 41, 59); // Slate 800
        pdf.text("STRUCTUSCAN PROFESSIONAL blueprint", 12, 16);
        
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139); // Slate 500
        pdf.text(`|  ${title}`, 78, 16);
        pdf.text("YYDS 影视技术创制部 • 精益管理报告", 140, 16);

        // Header thin line rule
        pdf.setDrawColor(226, 232, 240); // Slate 200
        pdf.setLineWidth(0.3);
        pdf.line(12, 19, 198, 19);

        // Footer rule and details
        pdf.line(12, 282, 198, 282);
        pdf.setFontSize(7);
        pdf.text("Confidential / Auto-Generated via StructuScan Pro A4 Engine", 12, 287);
        pdf.text(`Page ${pageNo} of 3`, 182, 287);
      };

      // PAGE 1: Metrics and OrgTree
      setExportProgress("正在高保真数字渲染：大盘指标与树状架构 (Page 1/3)...");
      const metricsEl = document.getElementById("metrics-panel");
      const treeEl = document.getElementById("org-tree-panel");
      
      if (!metricsEl || !treeEl) {
        throw new Error("Required layout elements for Page 1 are missing");
      }

      const metricsCanvas = await html2canvas(metricsEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const treeCanvas = await html2canvas(treeEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      drawFrame("业务大盘与科室架流架构图", 1);
      
      const metricsW = 186;
      const metricsH = (metricsCanvas.height * metricsW) / metricsCanvas.width;
      pdf.addImage(metricsCanvas.toDataURL("image/png"), "PNG", 12, 22, metricsW, metricsH);
      
      const treeW = 186;
      const treeH = (treeCanvas.height * treeW) / treeCanvas.width;
      // Restrict height nicely within page boundary to hold together
      const maxTreeH = 282 - (22 + metricsH + 4) - 3;
      pdf.addImage(treeCanvas.toDataURL("image/png"), "PNG", 12, 22 + metricsH + 4, treeW, Math.min(treeH, maxTreeH));

      // PAGE 2: Role Details
      setExportProgress("正在解析人员编制：岗位全能权责明细 (Page 2/3)...");
      const roleEl = document.getElementById("role-details-panel");
      if (!roleEl) throw new Error("Role details element missing");

      // Temporarily expand scrollable container inside layout clones to render all items cleanly
      const originalMaxHeight = roleEl.style.maxHeight;
      const originalOverflow = roleEl.style.overflow;
      roleEl.style.maxHeight = "none";
      roleEl.style.overflow = "visible";

      const roleCanvas = await html2canvas(roleEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      // Restore
      roleEl.style.maxHeight = originalMaxHeight;
      roleEl.style.overflow = originalOverflow;

      pdf.addPage();
      drawFrame("部门全岗位核心全景职责与 KPI 考核", 2);

      const roleW = 186;
      const roleH = (roleCanvas.height * roleW) / roleCanvas.width;
      const maxRoleH = 282 - 22 - 3;
      pdf.addImage(roleCanvas.toDataURL("image/png"), "PNG", 12, 22, roleW, Math.min(roleH, maxRoleH));

      // PAGE 3: Workflow Sequence & Simulation
      setExportProgress("正在智能图谱重构：双轨协同业务流程图 (Page 3/3)...");
      const workflowEl = document.getElementById("workflow-panel");
      if (!workflowEl) throw new Error("Workflow component panel missing");

      const workflowCanvas = await html2canvas(workflowEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          // Hide dynamic simulator control logs if we don't want terminal ink consumption
          const dynamicSimulator = clonedDoc.querySelector(".no-print");
          if (dynamicSimulator) {
            (dynamicSimulator as HTMLElement).style.display = "none";
          }
        }
      });

      pdf.addPage();
      drawFrame("影视业务协同、瑕疵退回重修与发布主流程线", 3);

      const workflowW = 186;
      const workflowH = (workflowCanvas.height * workflowW) / workflowCanvas.width;
      const maxWorkflowH = 282 - 22 - 3;
      pdf.addImage(workflowCanvas.toDataURL("image/png"), "PNG", 12, 22, workflowW, Math.min(workflowH, maxWorkflowH));

      setExportProgress("打包就绪中，即将激活系统下载通道...");
      
      // Save trigger
      pdf.save("YYDS-影视组岗位与流程架构完整报告.pdf");
      setExportProgress("导出成功！");
      
      setTimeout(() => {
        setIsExportingPDF(false);
        setExportProgress("");
      }, 1000);

    } catch (err) {
      console.error("PDF Generate error: ", err);
      setIsExportingPDF(false);
      setExportProgress("");
      // Trigger native print fallback gracefully
      handlePrint();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col">
      {/* Structural Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/10">
            YY
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              StructuScan Pro <span className="text-blue-600 font-normal text-sm ml-2">| YYDS影视组岗位与流程</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium font-sans mt-0.5 uppercase tracking-wider">
              Automatic PDF Parse & Work Scope Architect
            </p>
          </div>
        </div>
        
        {/* Quick controls from theme */}
        <div className="flex items-center gap-2 no-print">
          <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 mr-2">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            数据更新: Just Now (2026-06-02)
          </span>
          <button 
            onClick={handlePrint}
            className="cursor-pointer px-4 py-1.5 bg-white border border-slate-250 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            打印当前架构
          </button>
          <button 
            onClick={handleDirectPDFExport}
            disabled={isExportingPDF}
            className={`cursor-pointer px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
              isExportingPDF 
                ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10 hover:shadow-md"
            }`}
          >
            {isExportingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                正在生成高清 PDF...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                直接导出完整 PDF
              </>
            )}
          </button>
        </div>
      </header>

      {/* Generating High Def PDF Toast Loader Bar */}
      {isExportingPDF && (
        <div className="bg-blue-600 text-white px-6 py-2.5 text-center text-xs font-medium flex items-center justify-center gap-2 shadow-inner no-print transition-all duration-300">
          <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
          <span className="font-semibold tracking-wide">PDF 直接导出：</span>
          <span className="font-mono text-blue-100">{exportProgress}</span>
        </div>
      )}

      {/* Main Container Work Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 space-y-6">
        
        {/* Department Overview Top Metrics Grid */}
        <div id="metrics-panel" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs text-left relative overflow-hidden group">
            <span className="absolute top-4 right-4 bg-blue-50 text-blue-600 p-1.5 rounded-lg transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <LayoutGrid className="w-4 h-4" />
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">部门职位编制</span>
            <p className="text-xl font-extrabold text-slate-800 mt-2">7 个核心岗位</p>
            <span className="block text-[11px] text-slate-500 mt-0.5">覆盖全生命链制作</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs text-left relative overflow-hidden group">
            <span className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 p-1.5 rounded-lg transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <Users className="w-4 h-4" />
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">在编专业人员</span>
            <p className="text-xl font-extrabold text-slate-800 mt-2">11 位资深干员</p>
            <span className="block text-[11px] text-slate-500 mt-0.5">网格复合交叉分工</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs text-left relative overflow-hidden group">
            <span className="absolute top-4 right-4 bg-sky-50 text-sky-600 p-1.5 rounded-lg transition-colors group-hover:bg-sky-600 group-hover:text-white">
              <Award className="w-4 h-4" />
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">日产量指标要求</span>
            <p className="text-xl font-extrabold text-slate-800 mt-2">精品2min / 跑量10min</p>
            <span className="block text-[11px] text-slate-500 mt-0.5">双产线并联快速跑量</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs text-left relative overflow-hidden group">
            <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 p-1.5 rounded-lg transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">质量控制拦截</span>
            <p className="text-xl font-extrabold text-slate-800 mt-2">二次退回重修机制</p>
            <span className="block text-[11px] text-slate-500 mt-0.5 font-semibold text-emerald-650">一权签字/瑕疵100%拦截</span>
          </div>
        </div>

        {/* Dynamic Split Layout for OrgTree & Target details */}
        <div className="flex flex-col gap-6 items-start w-full">
          {/* Top Section: Interactive Organizational Tree structure */}
          <div id="org-tree-panel" className="w-full">
            <OrgTree 
              selectedRoleId={selectedRoleId} 
              onSelectRole={handleSelectRole} 
            />
          </div>

          {/* Bottom Section: Dynamic target responsibilities & KPI dashboard card */}
          <div id="role-details-panel" className="w-full h-full">
            <RoleDetails 
              selectedRoleId={selectedRoleId} 
              onSelectRole={handleSelectRole} 
            />
          </div>
        </div>

        {/* Full-width Row: Workflow Sequence Diagram & Interactive Core simulation */}
        <div id="workflow-panel" className="w-full">
          <Workflow />
        </div>

      </main>

      {/* Footer Status Bar with Professional Slate style */}
      <footer className="bg-white border-t border-slate-200 px-6 py-3 shrink-0 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-medium">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 justify-center sm:justify-start">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
              <span className="text-slate-600 font-bold">智能解析引擎已就绪</span>
            </div>
            <span className="h-3 w-px bg-slate-300 hidden sm:inline" />
            <span>输入源: <strong className="text-slate-600 font-semibold">yyds_department_mapping_v2.pdf</strong>与流程图组</span>
            <span className="h-3 w-px bg-slate-200 hidden sm:inline" />
            <span>检测页数: 3/3 页</span>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handlePrint}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer animate-pulse"
            >
              打印与高品质 PDF 导出指南
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-mono text-[10px]">System Version 1.0.8 (Blue-White)</span>
          </div>
        </div>
      </footer>

      {/* Aesthetic PDF & Printing Interactive Overlay Guide */}
      {showPrintGuide && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-2 text-blue-600">
                <Printer className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 text-base">打印当前架构 & PDF 导出指南</h3>
              </div>
              <button 
                onClick={() => setShowPrintGuide(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-left">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                  i
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-800 uppercase tracking-wider">由于浏览器沙箱安全策略限制</h4>
                  <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                    当前预览处于 Iframe 框架中，直接点击可能由于沙箱默认安全规则未能呼起打印面板或界面缺失。请根据以下快速动作获取完美的 A4 打印与 PDF 文件！
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 mt-0.5 font-mono">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-800">在新标签页中打开 App (核心)</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      请点击预览区右上角的 <strong className="text-slate-700 animate-pulse">“新窗口打开” (Open in new tab)</strong> 图标（带有小箭头的按钮），即可完全解除宿主 Iframe 沙漏的限制。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 mt-0.5 font-mono">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-800">按 Ctrl + P / Cmd + P 进行打印</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      在新标签页中再次点击 <strong className="text-slate-700">“打印当前架构”</strong> 按钮，或在键盘上直接按下 <span className="bg-slate-100 border border-slate-200 px-1 py-0.5 rounded font-mono text-[10px] text-slate-800 font-bold">Ctrl + P</span> (Mac 系统请用 <span className="bg-slate-100 border border-slate-200 px-1 py-0.5 rounded font-mono text-[10px] text-slate-800 font-bold">Cmd + P</span>)。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 mt-0.5 font-mono">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-800">另存为 PDF 并选中「背景图形」</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      在系统打印弹窗中，将目标打印机设置为 <strong className="text-slate-700">“另存为 PDF” (Save as PDF)</strong>，并在“更多设置”中勾选 <strong className="text-blue-700 font-semibold bg-blue-50 border border-blue-100 px-1 rounded">“背景图形” (Background graphics)</strong>，即可将精品架构与色彩矢量完美保存为 PDF 文件！
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between gap-3 items-center">
              <span className="text-[10px] text-slate-400 font-mono">PDF Print Engine v1.2.0</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    try {
                      window.print();
                    } catch (e) {
                      console.warn(e);
                    }
                  }}
                  className="cursor-pointer px-4 py-2 bg-slate-200 hover:bg-slate-250 text-slate-700 text-xs font-bold rounded-lg transition-all"
                >
                  再次尝试打印
                </button>
                <button 
                  onClick={() => setShowPrintGuide(false)}
                  className="cursor-pointer px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all shadow-blue-500/10"
                >
                  我知道了
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
