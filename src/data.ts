/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoleInfo, TreeNode, WorkflowStep } from "./types";

// Core job details for each role
export const ROLES_DATA: RoleInfo[] = [
  {
    id: "gm",
    title: "总经理",
    department: "管理层",
    members: ["王恩茂"],
    bgGradient: "from-blue-700 to-indigo-900 text-white",
    responsibilities: [
      "对接影视资源：负责统筹并促成外部优质影视资源、制作项目与发行渠道合作。",
      "全面监督审查：对影视部门的运作、产出内容及整体产效进行全方位审查与行政监管。"
    ],
    performanceKPI: "保证影视部全周期良性运转，高效对接关键合作资源"
  },
  {
    id: "leader",
    title: "影视组负责人",
    department: "影视运营及统筹",
    members: ["王恩茂", "王保策", "王昊冉"],
    bgGradient: "from-blue-600 to-sky-700 text-white",
    responsibilities: [
      "周期节点把控：全面对接并清晰把控各影视项目的工作周期节点，认真、按时落实各项制作任务。",
      "人员统筹调配：明确公司岗位职能，根据不同项目特征与急缓程度，协调与合理化人员组合配置。",
      "需求文档核定：明确影视类型、题材、集数、单集时长、目标受众、核心卖点等关键参数，并撰写立项报告、完成风险评估、预算及周期规划。",
      "辅助脚本校验：协助导演开展剧本的逻辑校验、时长估算与政策合规性筛查，全团队共同研判确认剧本的落地可行性。"
    ],
    performanceKPI: "保障项目延误率为0%，完成精准的立项风险与预算评估，实现工作流无缝咬合"
  },
  {
    id: "director",
    title: "导演",
    department: "艺术创作与把控",
    members: ["郑丹"],
    bgGradient: "from-indigo-600 to-blue-600 text-white",
    responsibilities: [
      "剧情与内核掌控：完全掌握全剧的剧情主线、人物性格弧光与核心戏剧冲突；输出分集梗概，精确明确每集的核心剧情、高能反转点与时长要求。",
      "艺术视听定调：决定最终画面的视觉质感、光影主调性、镜头运镜手法、人物IP设定及场景空间美术风格。",
      "上下游制作宣贯：与AI内容生成人员、中后期制作保持最紧密、高频的沟通，下发详细的制作方案与标准图样。全过程监控内容生成人员输出的艺术质量与生成效率。",
      "资料考证查找：深入翻阅及查找剧本所需的各类参考资料，包括但不限于历史文献、美术服装样式、对应影视风格参考等，规避低级常识错误。"
    ],
    performanceKPI: "画面风格首版定稿率 >= 80%，素材镜头规范率100%，无低级美术/逻辑/常识性错误"
  },
  {
    id: "content_gen",
    title: "内容生成与素材制作",
    department: "AIGC创制部",
    members: ["王成珂", "黄燚", "南金言", "谢诗喆"],
    bgGradient: "from-sky-500 to-blue-600 text-white",
    responsibilities: [
      "提示词策划编写：负责创意提示词（Prompts）的深度策划、分类与撰写优化，降低废片率，实现AI画面内容高精准产出。",
      "数字资产构建：负责数字人资产整合、特征固化，搭建虚拟场景道具，保障关键人物及场景跨镜头的一致性与稳定性，同时进行规范的数字资产归档。",
      "镜头与参数精细规划：制定精确的AI生成方案，明晰每一个镜头的生成参数、关键词、镜头调度方式与风格参考图；制定完整的镜头清单，做到全剧无漏洞覆盖。",
      "画面瑕疵筛查与分类：产出的所有视频画面必须符合分镜脚本及定版风格，画面应全无明显的AI瑕疵或常识逻辑错误；素材需按镜头、集数标准分类、重命名归功，规范工程文件格式。"
    ],
    performanceKPI: "精品剧集：一人一天产出约2分钟视频；跑量视频：一人一天产出5-10分钟视频。广告及宣传片按具体情况而定。"
  },
  {
    id: "post_prod",
    title: "后期制作",
    department: "中后剪辑与包装",
    members: ["王保策", "宋美婷"],
    bgGradient: "from-blue-400 to-indigo-600 text-white",
    responsibilities: [
      "【粗剪环节】：整理各路素材并精确排版成片，保证符合剧本剧情逻辑及单集时长规范；镜头衔接要丝滑连贯，无任何大跨度拼凑造成的逻辑断层；对于发现的瑕疵素材，必须给出明确反馈意见退回给内容生成人员进行重制修改。",
      "【精剪与包装】：细修影片节奏使其契合短剧的黄金爆点与转折调性，镜头组接切换流畅；添加并精修特效、动效与符合画面格调的转场；确保字幕准确无误，字幕样式大小、颜色完美贴合短剧风格；精细校合音频与音效，确保其与画面帧严格同步，阻断任何一处杂音或爆音现象。"
    ],
    performanceKPI: "紧密咬合内容生成者的工期进度，做到素材产出次日即必须高质交付成片，成片瑕疵率 <= 1%"
  },
  {
    id: "reviewer",
    title: "审片小组",
    department: "质量控制中心",
    members: ["司总", "茂哥(王恩茂)", "王昊冉", "王保策", "郑丹"],
    bgGradient: "from-slate-700 to-blue-900 text-white",
    responsibilities: [
      "多方交叉联合审核：全体审片主要小组成员对成品片源进行多维度、深层次的联合内审，将排查出来的修改意见整理收集并敦促调整落实。",
      "精细核准交付要求：严控成片与原剧本契合度，并审查是否达成了约定的美术画风定调、以及对应甲方的具体合同内容指标。",
      "合规及内容校正：严格检验政治/常识合规问题，全片禁现文字拼写、配音逻辑、常识偏失等低级内容故障。",
      "一权签字盖定：对返修完毕的合格成片，由茂哥(王恩茂)进行最终审查、全团队内部统签、并手写签字定稿，代表作品完结归档。"
    ],
    performanceKPI: "出片合规率达100%，一次审核通过率提高至90%以上，拒绝任何未签字片源流出"
  },
  {
    id: "ops_traffic",
    title: "影片运营与投流",
    department: "内容运营与市推",
    members: ["刘超"],
    bgGradient: "from-blue-800 to-blue-950 text-white",
    responsibilities: [
      "成品上架对接：对接各大平台账户和内容分发系统，高标完成合规素材的上架以及文案编写、标签优化。",
      "广告投放与账户管理：负责构建整体付费投放架构（搭建账户树），策划短剧起步投流策略，跟进不同预算配额下的起号跑量。",
      "实时盯盘控流：分钟级实时盯盘，观测Roi（ROI > 目标线）、消耗曲线、完播率等数据变化，灵活精调或中止投放预算计划。",
      "复盘归纳与信息输送：每日/周进行全面数据复盘并对投入产出结果进行逻辑化迭代，定期将高热镜头、优转关键词信息反哺创作上游。"
    ],
    performanceKPI: "投放回报率(ROI)保持在优值区间，上架准时率 100%，精准诊断爆款素材要素"
  }
];

// Flat Member Map for avatars, badges, etc.
export const MEMBERS_DATA = [
  { name: "王恩茂", label: "总经理/负责人", color: "bg-blue-600 text-white" },
  { name: "王保策", label: "负责人/后期/审片", color: "bg-indigo-600 text-white" },
  { name: "王昊冉", label: "负责人/审片", color: "bg-sky-600 text-white" },
  { name: "郑丹", label: "导演/审片", color: "bg-violet-600 text-white" },
  { name: "王成珂", label: "内容生成", color: "bg-emerald-600 text-white" },
  { name: "黄燚", label: "内容生成", color: "bg-teal-600 text-white" },
  { name: "南金言", label: "内容生成", color: "bg-cyan-600 text-white" },
  { name: "谢诗喆", label: "内容生成", color: "bg-blue-500 text-white" },
  { name: "宋美婷", label: "后期制作", color: "bg-pink-600 text-white" },
  { name: "司总", label: "审片顾问", color: "bg-amber-600 text-white" },
  { name: "刘超", label: "运营投流", color: "bg-slate-700 text-white" }
];

// Tree graph specification for hierarchical rendering
export const ORG_TREE_ROOT: TreeNode = {
  id: "gm",
  title: "总经理",
  subtitle: "对内全面决策与部门监督审查",
  members: ["王恩茂"],
  children: [
    {
      id: "leader",
      title: "影视组负责人",
      subtitle: "立项规划、周期节点控管与资源调配",
      members: ["王恩茂", "王保策", "王昊冉"],
      children: [
        {
          id: "director",
          title: "导演",
          subtitle: "剧情灵魂掌握与美学视听统筹把控",
          members: ["郑丹"],
          children: [
            {
              id: "content_gen",
              title: "内容生成与素材制作",
              subtitle: "AI绘画、提示词优化与素材规范归档",
              members: ["王成珂", "黄燚", "南金言", "谢诗喆"]
            },
            {
              id: "post_prod",
              title: "后期制作",
              subtitle: "音画精密裁剪、视听包装与字幕调色",
              members: ["王保策", "宋美婷"]
            },
            {
              id: "reviewer",
              title: "审片小组",
              subtitle: "成品交叉审评与茂哥手写签字确认定稿",
              members: ["司总", "王恩茂", "王昊冉", "王保策", "郑丹"],
              children: [
                {
                  id: "ops_traffic",
                  title: "影片运营与投流",
                  subtitle: "各大分发平台铺量及商业ROI投放控制",
                  members: ["刘超"]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Workflow step-by-step description with loops for interactive process simulation
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "1. 需求与立项规划",
    role: "总经理 & 影视组负责人",
    members: ["王恩茂", "王保策", "王昊冉"],
    responsibilities: [
      "明确需求：梳理并核定影视类型、题材、目标受众与核心卖点。",
      "立项报告：完成全套项目预算决策、风控计划、全周期生产节点计划书。"
    ],
    kpi: "产出完整的立项策划书与周期节点表，实现项目零超支或逻辑缺漏。",
    statusText: "正在由负责人起草立项策划书与排期时间表...",
    nextStepId: 2
  },
  {
    id: 2,
    title: "2. 艺术解构与前期定调",
    role: "导演",
    members: ["郑丹"],
    responsibilities: [
      "剧本梳理：掌握全剧线与冲突反转，编定分集梗概大纲及时间区间预算。",
      "美学定型：确定最终视听的风格调性、场景道具示例并输出提示词参考方案。"
    ],
    kpi: "下发标准明确的视频色彩、镜头运镜规划、参考图集，让内容生成组有样可考。",
    statusText: "导演正在解构剧本设定，并输出美术风格参考图及视听定调脚本...",
    nextStepId: 3
  },
  {
    id: 3,
    title: "3. AI内容生成与素材制作",
    role: "内容生成组",
    members: ["王成珂", "黄燚", "南金言", "谢诗喆"],
    responsibilities: [
      "AIGC生图生片：通过科学的提示词撰写与优化控制AI，实现高产低废；固化数字人分镜，分类整理命名各集素材。",
      "归类与归档：按镜头与集数精准建档归类，工程目录命名严格规范。"
    ],
    kpi: "日产标准：精品2分钟成片素材/人；跑量视频5-10分钟素材/人。",
    statusText: "内容生成组在运行AI绘画和帧生成程序，将通过重命名后的镜头分批交付...",
    nextStepId: 4
  },
  {
    id: 4,
    title: "4. 后期粗剪、精剪与修饰",
    role: "后期制作组",
    members: ["王保策", "宋美婷"],
    responsibilities: [
      "粗剪把控：对内容生成交回的素材按照总线脚本合并，对于画面闪烁或偏色AI暇疵退回内容生成组重修。",
      "精细剪裁与包装：进行调色剪辑、添加转场动效特效、校对并渲染高匹配字幕、合成高品质混音与同步环境声。"
    ],
    kpi: "高精准次日交付。若素材质量有问题，激活「素材瑕疵回传」机制反馈重造。",
    statusText: "后期组正在编排时间轴粗剪。对于AI瑕疵严重的镜头，正在打回重修...",
    nextStepId: 5,
    returnStepId: 3,
    returnLabel: "素材瑕疵回传 (退回AI重制)"
  },
  {
    id: 5,
    title: "5. 全员联合审片与手写定稿",
    role: "审片小组",
    members: ["司总", "王恩茂(茂哥)", "王昊冉", "王保策", "郑丹"],
    responsibilities: [
      "交叉内审：检验剧本贴合度、风格一致性、音画流畅度及甲方的硬性需求。",
      "茂哥签字定案：最终检查，解决合规性质疑后，由茂哥本人最终手写签名确认定稿。"
    ],
    kpi: "成片100%合规。发现成片不符合指标则强制退回后期组返修排查（成片不合格返工）。",
    statusText: "审片小组成员正在召开交片评审会。若未能通过全员一致把关，将被打回重剪...",
    nextStepId: 6,
    returnStepId: 4,
    returnLabel: "成片不合格返工 (退回后期重剪)"
  },
  {
    id: 6,
    title: "6. 定流投放与商业变现",
    role: "影片运营与投流",
    members: ["刘超"],
    responsibilities: [
      "极速分发：完成成品内容的高效上架与标题文案优化。",
      "搭建账户与动态投流：搭建精准获客漏斗，实时监视ROI并动态平抑控制消耗。"
    ],
    kpi: "ROI达标。收集高转化的爆款视觉段落并逆向反哺剧本与内容生成部门。",
    statusText: "运营总监正在执行素材上棚并设置高转化率千川/磁力金牛精准投放，持续收集投放Roi数据...",
  }
];
