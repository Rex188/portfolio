# Portfolio 作品集总览

> **定位**：Rex 本科申请 Music Technology / CS + Music 核心作品集体系。  
> **核心立意**：**「可控与不可控的边界」** —— *We build systems to control uncertainty, yet those systems inevitably create new forms of uncertainty.*

---

## 目录架构全景

```text
portfolio/
├── README.md             ← 【本导航】作品集总体架构与项目指引
├── project 1/            ← 【活跃工程】项目一 Robin 现场控制系统与乐器装置
│   ├── final/            ← 现场表演唯一权威源码、实拍分镜与执行手册
│   ├── scripts/          ← Video Essay 视频脚本主线（含 scripts/archive/ 历史草稿）
│   ├── Ableton_Kick_Setup.md ← Live 虚拟总线配置指南
│   ├── robin_kick.wav    ← 核心 Kick 采样源
│   └── archive/          ← 最终弃用归档（early_web_robin/ 与 early_patches/）
├── project2/             ← 【活跃工程】项目二 A Machine for Misunderstanding
│   ├── workflow/         ← DeepSeek VAD 向量计算中枢、Max 路由与 VCV 模板
│   ├── blind_test/       ← 现象学双盲测试实验系统与声学桥接
│   ├── training/         ← LoRA 微调训练管线
│   ├── models/           ← 活跃使用的微调模型 (qwen_lora)
│   ├── LAB_REPORT.md     ← 实验数据审计与研究报告
│   ├── CASE_STUDIES.md   ← 现象学案例分析
│   ├── BLIND_TEST_PLAN.md / SCHEMA / STATE_MACHINE ← 盲测规范三件套
│   ├── guide.md          ← Max/MSP + VCV 学习指南
│   ├── review.md / .pdf  ← 项目二评审报告
│   └── archive/          ← 最终弃用归档（early_docs/, early_patches/, 旧模型备份）
├── project 3/            ← 【探索中】项目三（声音采样与再倾听、反馈回路现场演化）
│   ├── Project 3.md      ← 核心概念与立意笔记
│   └── archive/          ← 历史草案归档
├── p5_mission_control/   ← P5.js 实时任务控制台与作战看板
│   └── MISSION_CONTROL_P5R.md ← 心之怪盗团作战指令板
├── 导师与课程/           ← 跨项目导师指导、首课纪要与前沿研讨
│   ├── 第一次课程工作任务.md ← 阶段任务分解与实施规划
│   ├── 课程记录与反馈.md    ← 2026.08.15 首课纪要
│   └── aplus交流.md        ← 算法、温度与即兴哲学研讨
├── 作品集评估/           ← 作品集量化评估与顶尖院校 Rubric
│   ├── Benchmark.md      ← 满分 100 分评审量化标准
│   └── Benchmark.pdf     ← 评估报告排版导出件
├── writing/              ← 写作 Portfolio
│   └── 岛介集.pdf         ← 个人散文文集
└── video/                ← 历史演奏与实拍录像
    ├── 48.MP4            ← Robin 早期演奏视频
    └── pas performance.MP4 ← 打击乐比赛现场录像
```

---

## 核心项目矩阵与当前状态

| 项目 / 模块 | 技术栈 | 核心哲学 / 功能 | 状态 | 权威入口 |
|---|---|---|---|---|
| **Project 1: Robin** | ESP32-S3 + Max/MSP + Ableton Live | 物理控制器触觉与加速度计映射，现场即兴协商表演 | ✅ 100% 已定稿成片并上线 YouTube | `project 1/final/` |
| **Project 2: Misunderstanding** | DeepSeek LLM + Max + VCV Rack | 身体现象学文本情感映射为 Eurorack 电压与盲测实验 | ✅ 100% 开源发布并上线 GitHub | `project2/LAB_REPORT.md` |
| **Project 3: Resampling** | VCV Rack V0.2 + 现场声音自指反刍 | 倾听、再采样与系统自指反刍演化 | 🔥 补丁V0.2调优中 / 待现场录音 | `project 3/Project 3.md` |
| **导师与课程记录** | 课程纪要与反思 | 导师阶段任务、研讨反馈与底层逻辑梳理 | 📚 持续沉淀 | `导师与课程/` |
| **作品集评估体系** | 顶尖院校评审标准 | NYU/CMU/USC/MIT 导师视角 Benchmarking | 📊 评估基准 | `作品集评估/` |
| **独立写作集** | 文学创作 | 散文与个人文集，展现人文底色与写作深度 | ✍️ 成果收录 | `writing/岛介集.pdf` |

---

## 协作与归档规范

1. **工作区隔离**：`project 1` 与 `project2` 均为独立 Git 仓库和活动工作区，提交与开发请在其各自根目录下操作。
2. **废弃物归档准则**：
   - 任何项目（Project 1/2/3）中被新版本替代、失效或淘汰的早期补丁、文档、音色，统一移动至对应项目的 `archive/` 目录中封存，不得混放在根目录或活跃模块内。
   - Project 1 的早期 Tone.js Web 实现归入 `project 1/archive/early_web_robin/`；
   - Project 2 的早期草稿与旧模型归入 `project2/archive/`。
