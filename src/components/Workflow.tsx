/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { WORKFLOW_STEPS } from "../data";
import { Play, Pause, RotateCcw, ArrowRightLeft, RefreshCw, Layers, CheckCircle2, AlertTriangle, ChevronRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Workflow() {
  const [activeStepId, setActiveStepId] = useState<number>(0); // 0 means idle
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simulationStatus, setSimulationStatus] = useState<string>("站立状态 - 就绪。");
  const [speedMs, setSpeedMs] = useState<number>(3000); // 3 seconds per step
  const [loopCheck, setLoopCheck] = useState<boolean>(true); // allow random loops

  // Step-by-step simulator ticker
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStepId((prev) => {
        // If simulation hasn't started, initiate from step 1
        if (prev === 0) {
          addLog("🚀 [项目启动] 王恩茂与影视组负责人启动立项，开始规划受众与核心卖点。");
          setSimulationStatus("项目立项中...");
          return 1;
        }

        const currentStep = WORKFLOW_STEPS.find((s) => s.id === prev);
        if (!currentStep) return 1;

        // Step 3 (AI) to Step 4 (Post-prod) normal transition
        if (prev === 3) {
          addLog("📦 [镜头交付] AIGC创制部已完成视频渲染，镜头并规范重命名，输送给后期制作。");
          setSimulationStatus("后期精细剪辑中...");
          return 4;
        }

        // Step 4 (Post-prod) to Step 5 (Review) transition with possible loop
        if (prev === 4) {
          // 20% chance of material blemish loop
          const hasBlemishes = loopCheck && Math.random() < 0.25;
          if (hasBlemishes) {
            addLog("⚠️ [素材瑕疵回传] 后期组王保策在粗剪校验中发现多处明显的AI重影和常识逻辑错误，打回AI重制！");
            setSimulationStatus("发现严重闪烁瑕疵，退回AI组修改中...");
            return 3; // Jump back to AI generation
          } else {
            addLog("🎬 [后期完成] 调色、动效与字幕合轨完毕，后期组按期打出高标成片，递交审片委员会。");
            setSimulationStatus("审片会多方内审中...");
            return 555; // intermediary review stage
          }
        }

        if (prev === 555) {
          // Step 5 (Review) to Step 6 (Ops) with possible refund loop
          const failsReview = loopCheck && Math.random() < 0.20;
          if (failsReview) {
            addLog("❌ [成片不合格返工] 审片小组核查发现音轨与画面存在微秒爆音错位，否决定稿，退回后期组整修！");
            setSimulationStatus("音画精细瑕疵，打回后期组返工重审...");
            return 4; // Jump back to Post Production
          } else {
            addLog("✍️ [茂哥签字确认] 全员通过！成片符合甲方剧设，“茂哥”手写确认签字，作品最终定案。");
            setSimulationStatus("进入投流宣发...");
            return 5;
          }
        }

        if (prev === 5) {
          addLog("📈 [运营上线] 刘超上架视频，高位搭建千川投放模型，开始动态盯盘，监控商业变现。");
          setSimulationStatus("短剧线上常态化起量中...");
          return 6;
        }

        // If end, loop back or stop
        if (prev === 6) {
          addLog("🎉 [流程完结] 首批数据复盘指标喜人，高热镜头要素成功逆向反馈前段创作！项目胜利完成。");
          setSimulationStatus("首轮跑量成功！已跑通闭环。");
          setIsPlaying(false);
          return 6;
        }

        const next = currentStep.nextStepId || 0;
        return next;
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [isPlaying, activeStepId, speedMs, loopCheck]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("zh-CN", { hour12: false });
    setSimulationLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 7)]);
  };

  const handleStart = () => {
    if (activeStepId === 6) {
      // Log reset if completing
      setActiveStepId(1);
      setSimulationLogs([]);
      addLog("🚀 [二次启动] 开启全新项目的立项策划与审核运转。");
    } else if (activeStepId === 0) {
      setActiveStepId(1);
      addLog("🚀 [首期启动] 项目成功立项，开始进行目标受众、集数规划与风控合规校验。");
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStepId(0);
    setSimulationLogs([]);
    setSimulationStatus("站立状态 - 就绪。");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Block Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            业务流转图
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">
            YYDS影视业务协同一体化工作流程图
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            还原了短剧、视频从需求发起、AI内容合成、中后期剪切包装，到联合审签、数字运营投放的完整商业咬合回路。
          </p>
        </div>
        
        {/* Play control toggler */}
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <Pause className="w-3.5 h-3.5" /> 暂停流转
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-705 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5" /> {activeStepId > 0 ? "继续流转" : "运行流转模拟"}
            </button>
          )}

          <button
            onClick={handleReset}
            className="cursor-pointer flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition-all"
            title="重置"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 重置
          </button>
        </div>
      </div>

      {/* STATIC FLOW CHART WORKFLOW (HIGH VISUAL FIDELITY - BLUE-WHITE INSPIRED) */}
      <div className="relative mb-8 pt-4">
        <h3 className="text-sm font-extrabold text-slate-700 mb-6 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-blue-600" />
          常态业务流向图及退回判定回路
        </h3>

        {/* Steps Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 relative">
          
          {/* Step 1: 立项 */}
          <div className={`p-4 rounded-xl border transition-all ${
            activeStepId === 1 
              ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20" 
              : "border-slate-150 bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded">
                Stage 01
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">1. 立项规划</h4>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">影视负责人</span>
            <p className="text-[11px] text-slate-400 mt-2 border-t pt-1.5 leading-relaxed">
              确定影视类型、集数时长、目标受众，做好风控预算与排期。
            </p>
          </div>

          {/* Step 2: 导演前期 */}
          <div className={`p-4 rounded-xl border transition-all ${
            activeStepId === 2 
              ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20" 
              : "border-slate-150 bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded">
                Stage 02
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">2. 自研前期</h4>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">导演（郑丹）</span>
            <p className="text-[11px] text-slate-400 mt-2 border-t pt-1.5 leading-relaxed">
              梳理主剧情反转，明确画质艺术调性并下发AI制作指导。
            </p>
          </div>

          {/* Step 3: AI创制 */}
          <div className={`relative p-4 rounded-xl border transition-all ${
            activeStepId === 3 
              ? "border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-500/20" 
              : "border-slate-150 bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-teal-600 uppercase tracking-widest bg-teal-50 px-1.5 py-0.5 rounded">
                Stage 03
              </span>
              <span className="text-[9px] font-extrabold text-emerald-600">日产2min+</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">3. AIGC内容生成</h4>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">内容生成组</span>
            <p className="text-[11px] text-slate-400 mt-2 border-t pt-1.5 leading-relaxed">
              策划提示词降噪，AI渲染高质镜头，精确重命名建档分类。
            </p>
          </div>

          {/* Step 4: 后期剪辑 */}
          <div className={`relative p-4 rounded-xl border transition-all ${
            activeStepId === 4 
              ? "border-indigo-600 bg-indigo-50/20 ring-2 ring-indigo-500/20" 
              : "border-slate-150 bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded">
                Stage 04
              </span>
              <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1 rounded">可回传</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">4. 后期粗精剪</h4>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">后期制作组</span>
            <p className="text-[11px] text-slate-400 mt-2 border-t pt-1.5 leading-relaxed">
              粗剪核对时长，剔除瑕疵；精剪配乐转场加字幕特效，次日交付。
            </p>
          </div>

          {/* Step 5: 联合审片 */}
          <div className={`relative p-4 rounded-xl border transition-all ${
            activeStepId === 5 
              ? "border-slate-800 bg-slate-100 ring-2 ring-slate-800/20" 
              : "border-slate-150 bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded">
                Stage 05
              </span>
              <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-1 rounded">需签字</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">5. 联合内审</h4>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">审片委员会</span>
            <p className="text-[11px] text-slate-400 mt-2 border-t pt-1.5 leading-relaxed">
              交叉核对甲方及艺术风格，排除风险合规，最终签字确认。
            </p>
          </div>

          {/* Step 6: 运营投流 */}
          <div className={`p-4 rounded-xl border transition-all ${
            activeStepId === 6 
              ? "border-blue-900 bg-blue-50/50 ring-2 ring-blue-900/20" 
              : "border-slate-150 bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-blue-900 uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded">
                Stage 06
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">6. 运营投流</h4>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">影片运营与投流</span>
            <p className="text-[11px] text-slate-400 mt-2 border-t pt-1.5 leading-relaxed">
              素材极速发布上架架接，账户动态调盘控流，捕捞Roi复盘。
            </p>
          </div>

        </div>

        {/* Dynamic Return loop arrows representation */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2.5">
            <span className="inline-flex py-1 px-1.5 bg-rose-100 text-rose-700 text-xs font-bold rounded shrink-0">
              [ 机制 A ]
            </span>
            <div>
              <h5 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <ArrowRightLeft className="w-3.5 h-3.5 text-rose-500" />
                素材瑕疵回传 (Stage 04 ↩ Stage 03)
              </h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                若后期组在【粗剪】环节中发现生成的素材画面存在拼凑跳帧、逻辑严重反常或人物脸部AI错位等暇疵，立即阻断粗剪，退回内容生成组重新AI渲染，避免劣质素材流入中后宣发。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="inline-flex py-1 px-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded shrink-0">
              [ 机制 B ]
            </span>
            <div>
              <h5 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <ArrowRightLeft className="w-3.5 h-3.5 text-orange-500" />
                成片不合格返工 (Stage 05 ↩ Stage 04)
              </h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                审片委员多方联合会审中，若成品影片有不贴近剧设底蕴、配音多出噪声拼写异常或音效没同步对齐等硬伤，则拒绝发放定稿，打回后期组责令细化返修、二次交付。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED INTERACTIVE LIVE SIMULATOR BENCH */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 md:p-6 shadow-inner no-print">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-4 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              协同工作流在线模拟器 (Interactive Simulator)
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              直观观测一个项目从草拟、制作、内审到投放到市场上捕捞收益的完整协同工时。
            </p>
          </div>
          
          {/* Simulator options */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-455">
              <span>退回率校验:</span>
              <button
                onClick={() => setLoopCheck(!loopCheck)}
                className={`cursor-pointer px-2 py-0.5 rounded font-bold text-[10px] transition-all uppercase ${
                  loopCheck 
                    ? "bg-blue-600 text-white" 
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
                title="开启后模拟器在流转时将随机触发错误回传机制"
              >
                {loopCheck ? "开启随机退回" : "无暇理想状态"}
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-455">
              <span>频率:</span>
              <select
                value={speedMs}
                onChange={(e) => setSpeedMs(Number(e.target.value))}
                className="bg-slate-800 text-slate-300 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] outline-none"
              >
                <option value={1500}>1.5s 极速</option>
                <option value={3000}>3.0s 标准</option>
                <option value={5000}>5.0s 深度</option>
              </select>
            </div>
          </div>
        </div>

        {/* Current status marquee */}
        <div className="bg-slate-950 px-4 py-3 border border-slate-800 rounded-lg mb-5 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-blue-900/50 text-blue-400 font-extrabold px-1.5 py-0.5 rounded border border-blue-900/60 uppercase">
              Current Stage Status
            </span>
            <span className="text-sm font-bold text-white">{simulationStatus}</span>
          </div>

          <div className="text-[11px] text-slate-400 font-normal">
            当前激活干员：
            <span className="text-slate-200 font-semibold bg-slate-900 px-1.5 py-0.5 rounded ml-1">
              {activeStepId > 0
                ? (activeStepId === 555 ? "审片小组" : WORKFLOW_STEPS.find(s => s.id === activeStepId)?.members.join("、") || "影视组人员")
                : "等待立项启动"}
            </span>
          </div>
        </div>

        {/* Step Progression Timeline Nodes */}
        <div className="flex justify-between items-center overflow-x-auto gap-4 py-3 mb-6 min-h-[80px]">
          {WORKFLOW_STEPS.map((step) => {
            const isCurrent = activeStepId === step.id || (step.id === 5 && activeStepId === 555);
            const isCompleted = activeStepId > step.id && activeStepId !== 555 && !(step.id === 3 && activeStepId === 3);

            return (
              <div key={step.id} className="flex-1 flex flex-col items-center min-w-[90px] relative">
                {/* Node Dot circle */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                  isCurrent 
                    ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-110"
                    : isCompleted
                      ? "bg-emerald-950 border-emerald-500 text-emerald-400"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                }`}>
                  {isCompleted ? "✓" : step.id}
                </div>
                
                {/* Title */}
                <span className={`text-[10px] text-center mt-2 truncate max-w-[85px] leading-tight font-semibold ${
                  isCurrent ? "text-blue-400 font-bold" : isCompleted ? "text-emerald-500" : "text-slate-400"
                }`}>
                  {step.title.substring(3)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Simulation Monitor Logs */}
        <div className="space-y-2 bg-slate-950/80 p-4 rounded-lg border border-slate-800 max-h-56 overflow-y-auto">
          <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-2 border-b border-slate-900 pb-1.5">
            工期推进事务日志 (Simulation Audit logs)
          </div>
          <div className="space-y-1.5">
            {simulationLogs.length === 0 ? (
              <p className="text-slate-600 text-xs text-center py-4">无日志输出，请在右上方点击「运行流转模拟」按钮开启流程。</p>
            ) : (
              simulationLogs.map((log, index) => (
                <div key={index} className="text-xs flex items-start gap-2 leading-relaxed">
                  <span className="text-blue-500 text-[10px] shrink-0 font-mono select-none mt-0.5">▷</span>
                  <span className={`${
                    log.includes("⚠️") 
                      ? "text-rose-455 font-semibold bg-rose-950/20 px-1 py-0.5 rounded border border-rose-950" 
                      : log.includes("❌")
                        ? "text-amber-500 font-semibold bg-amber-955/20 px-1 py-0.5 rounded border border-amber-950"
                        : log.includes("✓") || log.includes("✍️")
                          ? "text-emerald-400 font-semibold"
                          : log.includes("🚀")
                            ? "text-blue-400 font-semibold"
                            : "text-slate-300"
                  }`}>
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
