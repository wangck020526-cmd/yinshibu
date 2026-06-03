/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { User, Users, ShieldAlert, Award, FileText, ArrowDown, ChevronRight, ZoomIn } from "lucide-react";
import { ORG_TREE_ROOT, ROLES_DATA } from "../data";
import { TreeNode } from "../types";
import { motion } from "motion/react";

interface OrgTreeProps {
  selectedRoleId: string;
  onSelectRole: (id: string) => void;
}

export default function OrgTree({ selectedRoleId, onSelectRole }: OrgTreeProps) {
  // Let's create an elegant visual grid tree that mirrors the exact YYDS organization chart.
  // The structure:
  //                 [ 总经理 | 王恩茂 ]
  //                         │
  //             [ 影视组负责人 | 王恩茂/王保策/王昊冉 ]
  //                         │
  //                    [ 导演 | 郑丹 ]
  //             ┌───────────┼───────────┐
  //             ▼           ▼           ▼
  //     [ 内容生成组 ]   [ 后期制作组 ]  [ 审片小组 ]
  //                                     │
  //                                     ▼
  //                               [ 影片运营与投流 ]

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <Users className="w-3 h-3" />
            团队岗位架构
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">
            YYDS影视组 · 树状组织架构图
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            商务直观层级结构，点击节点查看对应的岗位范围与业绩考核指标。
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block"></span> 选中状态
          </span>
          <span className="flex items-center gap-1 ml-2">
            <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-300 inline-block"></span> 基准状态
          </span>
        </div>
      </div>

      {/* Visual Tree Body */}
      <div className="flex flex-col items-center justify-start overflow-x-auto py-4 min-w-[320px]">
        {/* LEVEL 1:总经理 */}
        <motion.div 
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => onSelectRole("gm")}
            className={`cursor-pointer px-6 py-4.5 rounded-xl border transition-all text-center max-w-sm w-72 ${
              selectedRoleId === "gm"
                ? "bg-blue-900 border-blue-900 text-white shadow-md shadow-blue-900/10 scale-105"
                : "bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/50 shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`text-[10px] tracking-widest font-bold uppercase ${
                selectedRoleId === "gm" ? "text-blue-200" : "text-blue-600"
              }`}>
                Decision Tier / 决策层
              </span>
              <Award className={`w-4.5 h-4.5 ${selectedRoleId === "gm" ? "text-amber-300 animate-pulse" : "text-amber-500"}`} />
            </div>
            <h3 className="text-lg font-bold">总经理</h3>
            <div className={`text-sm mt-1.5 font-medium flex items-center justify-center gap-1 ${
              selectedRoleId === "gm" ? "text-blue-100" : "text-slate-600"
            }`}>
              <User className="w-3.5 h-3.5" />
              <span>王恩茂</span>
            </div>
            <p className={`text-[11px] mt-2 line-clamp-1 border-t pt-1.5 ${
              selectedRoleId === "gm" ? "text-blue-200/90 border-blue-800/80" : "text-slate-400 border-slate-100"
            }`}>
              ①对接影视资源 ②全部部门监督审查
            </p>
          </button>
        </motion.div>

        {/* Tree Line 1 */}
        <div className="w-0.5 h-8 bg-blue-300 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
        </div>

        {/* LEVEL 2: 影视负责人 */}
        <motion.div 
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <button
            onClick={() => onSelectRole("leader")}
            className={`cursor-pointer px-6 py-4.5 rounded-xl border transition-all text-center max-w-sm w-76 ${
              selectedRoleId === "leader"
                ? "bg-blue-700 border-blue-700 text-white shadow-md shadow-blue-700/10 scale-105"
                : "bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/50 shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`text-[10px] tracking-widest font-bold uppercase ${
                selectedRoleId === "leader" ? "text-blue-100" : "text-blue-600"
              }`}>
                Management Tier / 统筹层
              </span>
              <FileText className={`w-4 h-4 ${selectedRoleId === "leader" ? "text-sky-200" : "text-slate-400"}`} />
            </div>
            <h3 className="text-base font-bold">影视组负责人</h3>
            <div className={`text-xs mt-1.5 font-medium flex items-center justify-center gap-1.5 ${
              selectedRoleId === "leader" ? "text-blue-100" : "text-slate-600"
            }`}>
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>王恩茂 · 王保策 · 王昊冉</span>
            </div>
            <p className={`text-[11px] mt-2 leading-relaxed text-left border-t pt-1.5 ${
              selectedRoleId === "leader" ? "text-blue-100/90 border-blue-600/80" : "text-slate-400 border-slate-100"
            }`}>
              理调配、控周期、审核方案、全链合规校验
            </p>
          </button>
        </motion.div>

        {/* Tree Line 2 */}
        <div className="w-0.5 h-8 bg-blue-300 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
        </div>

        {/* LEVEL 3: 导演 */}
        <motion.div 
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button
            onClick={() => onSelectRole("director")}
            className={`cursor-pointer px-6 py-4.5 rounded-xl border transition-all text-center max-w-sm w-72 ${
              selectedRoleId === "director"
                ? "bg-indigo-700 border-indigo-700 text-white shadow-md shadow-indigo-700/10 scale-105"
                : "bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50 shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`text-[10px] tracking-widest font-bold uppercase ${
                selectedRoleId === "director" ? "text-indigo-200" : "text-indigo-600"
              }`}>
                Creative Control / 创作把控
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <h3 className="text-base font-bold">导演</h3>
            <div className={`text-xs mt-1.5 font-medium flex items-center justify-center gap-1 ${
              selectedRoleId === "director" ? "text-indigo-100" : "text-slate-600"
            }`}>
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>郑丹</span>
            </div>
            <p className={`text-[11px] mt-2 border-t pt-1.5 ${
              selectedRoleId === "director" ? "text-indigo-150 border-indigo-600/80" : "text-slate-400 border-slate-100"
            }`}>
              掌握剧情线、落视听质感、监管前中后期质量
            </p>
          </button>
        </motion.div>

        {/* BRANCHING LINES */}
        <div className="relative w-full max-w-[850px] flex flex-col items-center">
          {/* Vertical stem down to horizontal bar */}
          <div className="w-0.5 h-5 bg-blue-300"></div>
          {/* Horizontal crossbar linking Level 4 */}
          <div className="absolute top-5 left-[12%] right-[11%] lg:left-[17%] lg:right-[17%] h-0.5 bg-blue-300"></div>
          {/* Three vertical drops */}
          <div className="flex justify-between w-[88%] lg:w-[76%] h-6">
            <div className="w-0.5 h-full bg-blue-300"></div>
            <div className="w-0.5 h-full bg-blue-300"></div>
            <div className="w-0.5 h-full bg-blue-300"></div>
          </div>
        </div>

        {/* LEVEL 4: EXECUTION BLOCKS (3 SIBLINGS) */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-3 lg:gap-6 w-full max-w-5xl mt-1">
          
          {/* AIGC Production */}
          <motion.div 
            className="flex-1 flex flex-col items-center min-w-[260px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <button
              onClick={() => onSelectRole("content_gen")}
              className={`cursor-pointer w-full p-4.5 rounded-xl border transition-all text-left ${
                selectedRoleId === "content_gen"
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10 scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/30 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[9px] tracking-wide font-extrabold px-1.5 py-0.5 rounded ${
                  selectedRoleId === "content_gen" ? "bg-blue-700 text-blue-105" : "bg-blue-50 text-blue-600"
                }`}>
                  AIGC创制部 / AI产出
                </span>
                <span className="text-[10px] text-emerald-500 font-bold">日产2min+</span>
              </div>
              <h4 className="text-sm font-bold">内容生成与素材制作</h4>
              <p className={`text-xs mt-1 font-medium ${
                selectedRoleId === "content_gen" ? "text-blue-100" : "text-slate-500"
              }`}>
                王成珂 · 黄燚 · 南金言 · 谢诗喆
              </p>
              <div className={`mt-2.5 text-[11px] leading-relaxed border-t pt-2 ${
                selectedRoleId === "content_gen" ? "text-blue-105 border-blue-500" : "text-slate-400 border-slate-100"
              }`}>
                写创意词降低废片率，固化数字人统包场景，提供高量镜头。
              </div>
            </button>
          </motion.div>

          {/* Post Production */}
          <motion.div 
            className="flex-1 flex flex-col items-center min-w-[260px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <button
              onClick={() => onSelectRole("post_prod")}
              className={`cursor-pointer w-full p-4.5 rounded-xl border transition-all text-left ${
                selectedRoleId === "post_prod"
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10 scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/30 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[9px] tracking-wide font-extrabold px-1.5 py-0.5 rounded ${
                  selectedRoleId === "post_prod" ? "bg-indigo-700 text-indigo-105" : "bg-indigo-50 text-indigo-650"
                }`}>
                  后期制作 / 中后包装
                </span>
                <span className="text-[10px] text-indigo-500 font-bold">次日高质交付</span>
              </div>
              <h4 className="text-sm font-bold">后期制作</h4>
              <p className={`text-xs mt-1 font-medium ${
                selectedRoleId === "post_prod" ? "text-indigo-100" : "text-slate-500"
              }`}>
                王保策 · 宋美婷
              </p>
              <div className={`mt-2.5 text-[11px] leading-relaxed border-t pt-2 ${
                selectedRoleId === "post_prod" ? "text-indigo-105 border-indigo-500" : "text-slate-400 border-slate-100"
              }`}>
                粗剪排线反锁瑕疵，精剪短剧节奏、同步音效、字幕美化。
              </div>
            </button>
          </motion.div>

          {/* Review Group */}
          <motion.div 
            className="flex-1 flex flex-col items-center min-w-[260px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <button
              onClick={() => onSelectRole("reviewer")}
              className={`cursor-pointer w-full p-4.5 rounded-xl border transition-all text-left ${
                selectedRoleId === "reviewer"
                  ? "bg-slate-800 border-slate-800 text-white shadow-md shadow-slate-800/10 scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-800 hover:border-slate-800 hover:bg-slate-50/30 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[9px] tracking-wide font-extrabold px-1.5 py-0.5 rounded ${
                  selectedRoleId === "reviewer" ? "bg-slate-900 text-slate-105" : "bg-slate-100 text-slate-700"
                }`}>
                  审片中心 / 质检定风
                </span>
                <span className="text-[10px] text-rose-500 font-bold">茂哥签字定稿</span>
              </div>
              <h4 className="text-sm font-bold">审片小组</h4>
              <p className={`text-xs mt-1 font-medium ${
                selectedRoleId === "reviewer" ? "text-slate-200" : "text-slate-500"
              }`}>
                司总 · 王恩茂 · 王昊冉 · 王保策 · 郑丹
              </p>
              <div className={`mt-2.5 text-[11px] leading-relaxed border-t pt-2 ${
                selectedRoleId === "reviewer" ? "text-slate-300 border-slate-700" : "text-slate-400 border-slate-100"
              }`}>
                多方联合评审改错，严审合规性，甲方需求核准，签字交付。
              </div>
            </button>
          </motion.div>
        </div>

        {/* Downstream Drop To Operations */}
        <div className="flex flex-col items-center mt-3 mr-[-66%] md:mr-[-60%] lg:mr-[-66%] relative w-full max-w-[280px]">
          {/* Connector down from Review Group (The third branch) */}
          <div className="w-0.5 h-6 bg-blue-300"></div>
          <ArrowDown className="w-3 h-3 text-blue-500 mt-[-3px]" />
          
          {/* LEVEL 5: Operations & Traffic */}
          <motion.div 
            className="w-full mt-1.5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button
              onClick={() => onSelectRole("ops_traffic")}
              className={`cursor-pointer w-full p-4.5 rounded-xl border transition-all text-left ${
                selectedRoleId === "ops_traffic"
                  ? "bg-blue-950 border-blue-950 text-white shadow-md shadow-blue-950/10 scale-[1.02]"
                  : "bg-white border-slate-200 text-slate-800 hover:border-slate-800 hover:bg-blue-50/30 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[9px] tracking-wide font-extrabold px-1.5 py-0.5 rounded ${
                  selectedRoleId === "ops_traffic" ? "bg-black text-slate-200" : "bg-sky-50 text-sky-700"
                }`}>
                  运营及市推 / 内容铺量
                </span>
                <span className="text-[10px] text-blue-500 font-bold">商业闭环</span>
              </div>
              <h4 className="text-sm font-bold">影片运营与投流</h4>
              <p className={`text-xs mt-1 font-medium ${
                selectedRoleId === "ops_traffic" ? "text-slate-300" : "text-slate-500"
              }`}>
                刘超
              </p>
              <div className={`mt-2.5 text-[11px] leading-relaxed border-t pt-2 ${
                selectedRoleId === "ops_traffic" ? "text-slate-300 border-slate-800" : "text-slate-400 border-slate-100"
              }`}>
                素材极速上架优化，搭建投放账户、高频盯控ROI数据并复盘。
              </div>
            </button>
          </motion.div>
        </div>

      </div>

      {/* Guide prompt */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
        <ZoomIn className="w-3.5 h-3.5 text-blue-500" />
        <span>提示：点击任何岗位节点，即可在下方快速聚焦该岗位的工作范围与责任指标。</span>
      </div>
    </div>
  );
}
