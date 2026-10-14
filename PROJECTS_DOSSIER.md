# Portfolio Projects Dossier & Content Specifications
# 作品集项目档案与文本规范指南

> **参考标准**：[Atelier Rafael Lozano-Hemmer Project Archival Standard](https://www.lozano-hemmer.com/unfinished_arch.php)  
> **面向对象**：JHU Peabody Institute / CMU Music & Technology / NYU Steinhardt / MIT Media Lab 评审委员会  
> **作者/申请人**：Rex Li (李星逸)  
> **更新时间**：2026-10-14  

---

## 目录 (Table of Contents)

1. [项目一：Robin (物理手势乐器与现场控制系统)](#project-1-robin)
2. [项目二：A Machine for Misunderstanding (媒介误解机器)](#project-2-a-machine-for-misunderstanding)
3. [项目三：Resampling & Re-listening (现场采样与自指反刍)](#project-3-resampling--re-listening)
4. [全站资源映射表 (Global Assets & Path Directory)](#global-assets-directory)

---

<a id="project-1-robin"></a>
# Project 1: Robin

> **A Communicative System & Live Performance Instrument**  
>

```
                     ┌──────────────────┐
                     │ Physical Gestures│
                     │ (11 Pads + Accel)│
                     └─────────┬────────┘
                               │ Capacitive & Inertial Data
                               ▼
                     ┌──────────────────┐
                     │ ESP32-S3 Firmware│ 
                     └─────────┬────────┘
                               │ UDP / OSC Packets
                               ▼
                     ┌──────────────────┐
                     │ Python Socket GW │ (Normalization, Port Splitting)
                     └─────────┬────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
 ┌──────────────────────┐              ┌──────────────────────┐
 │ Max/MSP Core Patches │              │ Ableton Live Engine  │
 │ (Clock, Jerk Filter, │─────────────▶│ (Sub-Bass, Texture,  │
 │  Granular Loopers)   │  MIDI / M4L  │  Master Kick Drum)   │
 └──────────────────────┘              └──────────────────────┘
```

### 1. Curatorial Statement (作品陈述与策展文本)

Robin was born to fight against the obsession of control. 

As a percussionist, my teacher trained me to be precise. The next step is to be an artist. When I think of music as a form of art, instead of music scores, precision fades, and unexpected randomness takes over.
How much should we control as artists? 

Music is always expressive. I realized we need to talk, communicate with music. 

And Robin was talking.

---

### 2. General Info & Specifications (技术规格与作品元数据)

| Field (属性)                 | Specification (参数 / 说明)                                                           |
| :------------------------- | :-------------------------------------------------------------------------------- |
| **Year of Creation**       | 2026                                                                              |
| **Keywords**               | `instrument design`,`software design`,`performance`,`python`,`max/msp`,`ableton`  |
| **Medium / Tools**         | Custom ESP32-S3 Hardware, Python UDP Gateway, Max/MSP, Ableton Live, Max for Live |
| **Hardware Dimensions**    | Custom handheld  (approx. 240 × 160 × 45 mm)                                      |
| **Sampling & Audio Specs** | 48 kHz / 24-bit LPCM, Round-trip wireless UDP latency < 12 ms                     |
| **Edition / Status**       | Unique Artist Instrument (1 of 1), Active Performance Repertoire                  |


---

### 4. Bibliography & Companion Research (配套学术成果与文献)

* **Performance & Setup Protocols**:  
  * `performance.md` / `performance.pdf` — Performance Narrative & Sonic Philosophy
  * `现场组装与表演执行手册.md` — 48V Power Sequence & Pre-flight Inspection Protocol
  * `实拍执行分镜手册.md` — Complete Video Essay Director Storyboard

---

### 5. Media Assets & File Directory (媒体素材与代码路径)

#### 🎥 Video & Media
* **Official Video Essay (YouTube)**:
  * **Status**: 100% Final Master Online
  * **Video Embed Link**: *(YouTube URL to be linked / `https://www.youtube.com/watch?v=...`)*
  * **Target Durations**: 3:00 (Narrative Cut for Video Essay) / 5:28 (Uncut Master Performance)


#### 💻 Source Code & Patches
* **Firmware & Network Gateway**:
  * `/Users/rexli/Documents/Rex/portfolio/project 1/final/robin_to_max_udp.py` (ESP32 Signal Parsing, Normalization, Jerk Derivative Calculation)
* **Max/MSP & Audio Engineering**:
  * `/Users/rexli/Documents/Rex/portfolio/project 1/final/control.maxpat` (Master Clock, CC6 Jerk Modulation Filter)
  * `/Users/rexli/Documents/Rex/portfolio/project 1/final/pad_control.maxpat` / `.amxd` (Polyphonic Granular Resynthesis)
  * `/Users/rexli/Documents/Rex/portfolio/project 1/final/random_sequencer.maxpat` (Stochastic Probability Sequencer)
  * `/Users/rexli/Documents/Rex/portfolio/project 1/final/visual.maxpat` (Jitter Real-time Visualizer)
  * `/Users/rexli/Documents/Rex/portfolio/project 1/Ableton_Kick_Setup.md` (Virtual MIDI Routing Guide)

---


<a id="project-2-a-machine-for-misunderstanding"></a>
# Project 2: A Machine for Misunderstanding

> **Affective LLM-to-Eurorack Translation & Double-Blind Phenomenological Study**  


```
  ┌────────────────────────────────────────────────────────┐
  │  Literary Somatic Texts (Faulkner, Mishima, Dazai)     │
  └───────────────────────────┬────────────────────────────┘
                              │ Text Stream
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  LLM Affective Core: DeepSeek-V4.1 / Qwen-2.5 LoRA     │
  │  Vector Inference: {Valence, Arousal, Dominance, Conf} │
  └───────────────────────────┬────────────────────────────┘
                              │ Structured JSON Output
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  Python Bridge Server: Continuous Voltage Mapping      │
  │  $V_i \in [0.0\text{V}, 10.0\text{V}]$                 │
  └───────────────────────────┬────────────────────────────┘
                              │ OSC Bundles via UDP :7001
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  VCV Rack 2 Modular Synthesizer                        │
  │  - cvOSCcv / Bogaudio / Mutable Instruments Plaits     │
  │  - Plateau Reverb / Surge XT Delay / MixMaster         │
  └───────────────────────────┬────────────────────────────┘
                              │ Continuous Soundfield
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  Double-Blind Empirical Study & Interactive Web Report │
  └────────────────────────────────────────────────────────┘
```

### 1. Curatorial Statement (作品陈述与策展文本)

**A Machine for Misunderstanding** is an interactive bio-computational installation and empirical research system that investigates Marshall McLuhan’s foundational aphorism: *"The medium is the message."* In contemporary digital existence, interpersonal communication has been overwhelmingly compressed into text-based networks. While celebrated for instantaneity, this transmission strips away the somatic nuances of human vulnerability—subtle facial tics, vocal timbres, and metabolic breathing—replacing them with algorithmically mediated distortions that precipitate misunderstanding and psychological alienation.

This project renders the invisible distortion of media audible through modular synthesis. The system ingests highly visceral literary texts—ranging from William Faulkner’s fragmented interior monologues to Yukio Mishima’s aesthetic descriptions of destruction. Rather than using simplistic categorical emotion tags (e.g., Ekman’s six basic emotions), a specialized Large Language Model pipeline (fine-tuned Qwen 2.5 LoRA paired with DeepSeek-V4.1) projects text into a continuous 4D affective manifold: Valence (pleasure/displeasure), Arousal (physiological excitation), Dominance (agency/subjugation), and Confidence.

These vectors are calculated into continuous CV voltages ($0.0\text{V} - 10.0\text{V}$) and transmitted via high-speed UDP OSC into a generative Eurorack/VCV Rack modular environment. Emotional Arousal directly modulates the non-linear folding and harmonic distortion of Mutable Instruments Plaits; Valence warps the resonance and frequency coordinates of multi-pole filters; Dominance governs stereo spread, temporal delay feedback, and reverberant decay. 

To interrogate whether this machine translation conveys genuine affective meaning or merely subjects human emotion to institutional discipline, the project incorporates a rigorous double-blind phenomenological study and interactive web laboratory. Human subjects evaluate paired acoustic generations without knowing whether voltages were mediated by generalist LLMs or fine-tuned somatic models. The resulting soundscape is melancholic, volatile, and fragile: an aesthetic apparatus that turns communicative failure into poetic resonance.

---

### 2. General Info & Specifications (技术规格与作品元数据)

| Field (属性) | Specification (参数 / 说明) |
| :--- | :--- |
| **Year of Creation** | 2026 |
| **Keywords** | `affective-computing`, `eurorack`, `vcv-rack`, `llm-lora`, `phenomenology`, `mcluhan`, `double-blind-study` |
| **Medium / Tools** | Python 3.11, PyTorch, LoRA Micro-weights, DeepSeek API, VCV Rack 2 Pro, Max/MSP, Web Audio API, Vanilla HTML/CSS/JS |
| **Software Repository** | Fully Open Sourced on GitHub ([Rex188/Machine-for-Misunderstanding](https://github.com/Rex188/Machine-for-Misunderstanding)) |
| **Scientific Validation** | Empirical Double-Blind Testing Protocol, 4-Cohort Voltage Audit, Confusion Matrices |
| **Status** | 100% Completed, Deployed & Published |

---

### 3. Credits & Collaborators (制作演职员表)

* **Principal Investigator, System Architect & Composer**: Rex Li (李星逸)
* **Affective Model Fine-Tuning & Prompt Engineering**: Rex Li
* **Eurorack / VCV Rack Sound Design & Voltage Routing**: Rex Li
* **Web Laboratory Frontend & Data Visualizations**: Rex Li
* **Theoretical Framework Inspiration**: NYUSH Interactive Media Arts (IMA) Faculty; Prof. Michel Foucault & Marshall McLuhan literary corpora

---

### 4. Bibliography & Companion Research (配套学术成果与文献)

* **Primary Academic Treatise**:  
  Li, Xingyi (Rex). *"Discipline Without a Subject: LLM Alignment, Emotional Quantization, and the Panoptic Auditing of Human Somatic Vulnerability."* Independent Research Manuscript, 2026.  
  * **Vault Path**: `/Users/rexli/Documents/Rex/主要美国申请/课题二论文/`
* **Empirical Lab Documentation**:
  * `LAB_REPORT.md` — 15KB Full Voltage Audit & Empirical Findings
  * `CASE_STUDIES.md` — Literary Corpora Case Studies (Faulkner vs. Mishima)
  * `BLIND_TEST_PLAN.md` & `BLIND_TEST_DATA_SCHEMA.md` — Human Subject Protocols

---

### 5. Media Assets & File Directory (媒体素材与代码路径)

#### 🌐 Live Interactive Platforms & Repositories
* **Official GitHub Repository**:  
  `https://github.com/Rex188/Machine-for-Misunderstanding`
* **Interactive Web Research Report**:  
  `/Users/rexli/Documents/Rex/portfolio/project2/blind_test/web/report.html`  
  *(Features integrated VAD 3D coordinate plot, audio stem players, and dynamic data visualizers)*
* **Interactive Double-Blind Testing App**:  
  `/Users/rexli/Documents/Rex/portfolio/project2/blind_test/web/index.html`

#### 🎥 Video & Audio Demos
* **Session 3 YouTube Video Demonstration**:  
  Embedded in Report: `https://www.youtube.com/embed/ctAal_Ea91U`
* **Raw Session Screen & Sound Recordings**:
  * `/Users/rexli/Movies/2026-10-03 11-42-30.mp4` (Session 1: Baseline Calibration)
  * `/Users/rexli/Movies/2026-10-03 13-45-11.mp4` (Session 3: LoRA vs. DeepSeek Comparative Run)
  * `/Users/rexli/Movies/2026-10-03 13-58-18.mp4` (Session 4: Extreme Affective Stress-Testing)
* **Spectrogram Analysis Charts**:
  * `/Users/rexli/Documents/Rex/portfolio/project2/blind_test/web/media/perf_20261003_114155.png` ~ `135740.png`

#### 💻 Source Code & Modular Presets
* **Backend Inference & Voltage Engine**:
  * `/Users/rexli/Documents/Rex/portfolio/project2/workflow/llm_sound_interactive.py`
  * `/Users/rexli/Documents/Rex/portfolio/project2/workflow/web_controller_server.py`
* **Max/MSP & Eurorack Modular Patches**:
  * `/Users/rexli/Documents/Rex/portfolio/project2/workflow/max_interface.maxpat`
  * `/Users/rexli/Documents/Rex/portfolio/project2/workflow/generative template new mvp.vcv`
* **Trained LoRA Weights**:
  * `/Users/rexli/Documents/Rex/portfolio/project2/models/qwen_lora/`

---

<br/>

<a id="project-3-resampling--re-listening"></a>
# Project 3: Resampling & Re-listening

> **Live Acoustic Self-Recursion & Ecological Patch Evolution**  
> *基于现场环境采样、时间拉伸反刍与无振荡器自指反馈的生成式声学生态*

```
  ┌────────────────────────────────────────────────────────┐
  │  Audient iD14 Hardware Microphone (Acoustic Ingress)   │
  └───────────────────────────┬────────────────────────────┘
                              │ Pure Acoustic Energy
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  [1. EAR] Dual Follower Transient & Energy Detector    │
  └───────────────────────────┬────────────────────────────┘
                              │ Onset Gate
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  [2. BITE] Brainwash Buffer (Captures 0.4s Memory)     │
  │  Locked by EventTimer (45s Non-retrigger Interval)     │
  └───────────────────────────┬────────────────────────────┘
                              │ Continuous Waveform Memory
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  [3. RUMINATE] 4 Asymmetric Playback Readheads         │
  │  - Head 1: 0.002x (200s period) ➔ Low VCF Threshold    │
  │  - Head 2: 0.004x (100s period) ➔ Mid VCF Threshold    │
  │  - Head 3: 0.010x (40s period)  ➔ High VCF Threshold   │
  │  - Head 4: 1.000x Audio Rate    ➔ FMtool / AMRM Mod    │
  └───────────────────────────┬────────────────────────────┘
                              │ Evolving Control Voltages & Audio
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  [4. REACTION] Tehom 4-Band Looping + Bogaudio LMTR    │
  │  Hard Limit to Prevent Runaway Acoustic Explosion      │
  └───────────────────────────┬────────────────────────────┘
                              │ Acoustic Egress
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │  [5. MOUTH] 15s Sonic Resynthesis emitted back into    │
  │  the physical space to be re-heard by [EAR]            │
  └────────────────────────────────────────────────────────┘
```

### 1. Curatorial Statement (作品陈述与策展文本)

**Resampling & Re-listening** is an autonomous, non-linear modular acoustic ecology developed in VCV Rack Pro. Rooted in the post-Cagean aesthetic proposition that *"Sampling is not merely extraction; sampling is a recursive process of listening,"* the system strips away all conventional synthetic sound generators—containing **not a single synthetic oscillator or noise source**. Every sonic particle that emanates from the speakers originates exclusively from the physical acoustics of the room, captured in real time via an Audient iD14 microphone interface.

The patch operates as a self-referential living organism structured across five biological phases:
1. **The Ear (Ingress)**: A cascaded envelope follower detects sharp acoustic transients (claps, spoken words, ambient rustling) against background ambient floor.
2. **The Bite (Capture)**: Once triggered, the Brainwash memory buffer instantaneously records a microscopic 0.4-second acoustic fragment, simultaneously locking itself via a 45-second hardware timer (`EventTimer#9252`) to prevent repetitive over-saturation.
3. **The Rumination (Time-Stretched Feedback)**: Four asynchronous readheads continuously scan this 0.4-second memory at drastically diverging time ratios (0.002x, 0.004x, 0.01x, and 1.0x). The ultra-slow heads convert past micro-waveforms into undulating control voltages lasting up to 200 seconds. Crucially, **the memory of past sounds dictates how critically the system listens to the present**: these voltages dynamically re-tune the threshold comparators across three frequency bands.
4. **The Reaction & Limiting**: The sonic textures are processed through a 4-channel Tehom looper, Surge XT delay matrices, and Valley Plateau spatialization, governed by a newly calibrated `Bogaudio LMTR` soft-knee limiter to restrain acoustic feedback loops from catastrophic runaway distortion.
5. **The Mouth (Egress)**: The system emits a 15-second transformed acoustic response back into the air. This emitted sound propagates through physical space, reflects off walls, and is inevitably re-captured by the microphone—initiating an endless, self-evolving conversation where human intervention is reduced to an initial catalyst.

---

### 2. General Info & Specifications (技术规格与作品元数据)

| Field (属性) | Specification (参数 / 说明) |
| :--- | :--- |
| **Year of Creation** | 2026 |
| **Keywords** | `resampling`, `acoustic-ecology`, `feedback-loop`, `vcv-rack`, `cybernetics`, `zero-oscillator`, `self-reference` |
| **Medium / Tools** | VCV Rack 2 Pro (119 active modules, 188 virtual patch cables), Audient iD14 MKII Audio Interface, Studio Condenser Microphone |
| **Architecture Version** | **Patch V0.2 Final Verified** (Pruned 16 dead modules, integrated Bogaudio LMTR limiter, 45s timer lock) |
| **Sound Engine Type** | 100% Pure Acoustic Resampling (Zero synthetic VCOs) |
| **Status** | Verified V0.2 Engine Complete; Scheduled for Multi-Channel Field Recording |

---

### 3. Credits & Collaborators (制作演职员表)

* **Concept, Patch Architecture & Acoustic Design**: Rex Li (李星逸)
* **Reverse-Engineering & Topology Verification**: Antigravity Patch Deconstruction Engine
* **Acoustic Interface & Limiting Engineering**: Rex Li
* **Theoretical Grounding**: Deep Listening & Cybernetic Feedback Theory (Inspired by Pauline Oliveros & Alvin Lucier)

---

### 4. Bibliography & Engineering Audits (技术审计与文献)

* **Reverse-Engineering Master Dossier**:  
  `portfolio/project 3/project3_review.md` — 21KB Comprehensive port-by-port audit of `patch.json`, signal path demystification, and execution-order verification.
* **Architecture Changelog**:  
  `portfolio/project 3/V0.2_changelog.md` — Complete migration notes from V0.1.2 (134 modules) to V0.2 (119 modules + Bogaudio LMTR).
* **Conceptual Blueprints**:  
  `portfolio/project 3/Project 3.md` — The philosophical premise: *Samplings are controlling themselves*.

---

### 5. Media Assets & File Directory (媒体素材与代码路径)

#### 💻 Modular Patches & Code
* **Active V0.2 Production Patch**:  
  `/Users/rexli/Documents/Rex/portfolio/project 3/Project_3-V0.2.vcv`
* **Archival Baseline Patch**:  
  `/Users/rexli/Documents/Rex/portfolio/project 3/Project_3-V0.1.2.vcv`

#### 🎙️ Acoustic Recording Stems & Demonstrations
* **Live Hardware Routing Chain**: Audient iD14 Input 1 (DC blocker enabled) ➔ Bogaudio LMTR ➔ Rescale (±5V protective ceiling) ➔ Stereo Master Out
* **Pending Recording Assets (待录制清单)**:
  * `P3_Demo_01_Transient_Reaction.wav` (Handclap / Spoken Word trigger ➔ 6s Tehom burst)
  * `P3_Demo_02_Recursive_Ruminations.wav` (3-minute continuous self-evolving room feedback soundscape)
  * `P3_Demo_Video_Scope.mp4` (Screen capture of the 8 Bogaudio Scopes reacting to live room acoustics)

---

<br/>

<a id="global-assets-directory"></a>
# Global Assets & Path Directory (全站综合资源速查索引)

为了便于网站开发时一键定位、超链接与静态打包，以下汇总全作品集体系的所有核心文件绝对路径与远程访问地址：

```text
/Users/rexli/Documents/Rex/
│
├── portfolio/
│   ├── PROJECTS_DOSSIER.md       ← 【本文件】Lozano-Hemmer 标准项目全案规范
│   ├── README.md                 ← 作品集状态总览（P1 100% / P2 100% / P3 V0.2）
│   │
│   ├── project 1/                ← 【Project 1: Robin】
│   │   ├── final/
│   │   │   ├── robin_to_max_udp.py       (ESP32 网关脚本)
│   │   │   ├── control.maxpat            (主控 Max 补丁)
│   │   │   ├── pad_control.amxd          (M4L 采样切片设备)
│   │   │   ├── random_sequencer.maxpat   (随机音序生成器)
│   │   │   ├── performance.pdf           (现场演出全景指引)
│   │   │   └── 现场组装与表演执行手册.pdf  (硬件实操手册)
│   │   ├── scripts/
│   │   │   └── script-en.md              (Video Essay 英文定稿母脚本)
│   │   └── robin_kick.wav                (核心 Kick 采样源)
│   │
│   ├── project2/                 ← 【Project 2: A Machine for Misunderstanding】
│   │   ├── blind_test/web/
│   │   │   ├── report.html               (交互式研究报告入口)
│   │   │   ├── index.html                (双盲测试交互端入口)
│   │   │   └── media/                    (频谱图与视频软链接)
│   │   ├── workflow/
│   │   │   ├── llm_sound_interactive.py  (LLM VAD 计算中枢)
│   │   │   └── generative template new mvp.vcv (VCV Rack 模块化模板)
│   │   ├── LAB_REPORT.md                 (实验电压审计报告)
│   │   ├── CASE_STUDIES.md               (文学身体现象学案例)
│   │   └── [Remote GitHub]               https://github.com/Rex188/Machine-for-Misunderstanding
│   │
│   ├── project 3/                ← 【Project 3: Resampling & Re-listening】
│   │   ├── Project_3-V0.2.vcv            (V0.2 优化后权威补丁)
│   │   ├── Project_3-V0.1.2_analysis.md  (补丁拓扑逆向分析)
│   │   ├── project3_review.md            (深度信号流评审报告)
│   │   └── V0.2_changelog.md             (V0.2 精简与限幅器记录)
│   │
│   └── writing/
│       └── 岛介集.pdf                    (个人文学创作集)
│
├── 主要美国申请/                  ← 【学术论文支持】
│   ├── 课题一论文/                        (《A Structural Spectrum of Contingency》)
│   └── 课题二论文/                        (《Discipline Without a Subject》)
│
└── /Users/rexli/Movies/          ← 【视频与媒体工程】
    ├── Project1_VideoEssay.fcpbundle     (Robin Video Essay FCP 资源库)
    └── 2026-10-03 *.mp4                  (Project 2 双盲测试实测录像)
```
