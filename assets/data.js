/**
 * Single Source of Truth for Anuj Sharma's Portfolio (Grounded & Credible Edition)
 * Balanced tone: highlights real versatility across Full-Stack Web, Applied AI/CV,
 * Media Pipelines, and Operations Automation without exaggerated claims.
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Anuj Sharma",
    initials: "AS",
    role: "Full-Stack & AI Automation Engineer",
    tagline:
      "Building practical web applications, backend automation, local AI/computer-vision workflows, and media processing tools.",
    summary:
      "Computer Science graduate (B.Tech, 2026) and Full-Stack & Automation Engineer with hands-on experience across modern web apps (Next.js, React, TypeScript, PostgreSQL), backend automation (Node.js, Python, FastAPI), applied AI/computer-vision tooling, and audio/video pipelines. I enjoy working across the stack—connecting clean interfaces, serverless APIs, data workflows, and local AI utilities to solve practical operational bottlenecks.",
    location: "Jaipur, Rajasthan 302022",
    phone: "+91 8302787915",
    phoneHref: "tel:+918302787915",
    email: "anuj23012004@gmail.com",
    github: "https://github.com/kingsprayer",
    githubLabel: "github.com/kingsprayer",
    linkedin: "https://www.linkedin.com/in/anuj-sharma-7419562537",
    linkedinLabel: "linkedin.com/in/anuj-sharma-7419562537",
    livePlatformUrl: "https://saadaa-b2b-catalog.netlify.app",
    livePlatformLabel: "saadaa-b2b-catalog.netlify.app",
    availability: "Jaipur, India · B.Tech CSE '26 · Full-Stack & Automation"
  },

  pillars: [
    {
      value: "Full-Stack",
      suffix: " Web",
      label: "TypeScript, Next.js & Postgres",
      detail: "Live B2B catalog PWA, internal workflow apps, serverless APIs & Vitest testing",
      category: "fullstack"
    },
    {
      value: "Applied AI",
      suffix: " & CV",
      label: "Local Diffusion & Vision Tools",
      detail: "Apple Silicon PyTorch MPS, SDXL/ControlNet, SAM, Ollama & OpenCV pipelines",
      category: "ai"
    },
    {
      value: "Media",
      suffix: " Pipelines",
      label: "Audio, Video & Localization",
      detail: "Faster-Whisper clip sorting, Demucs/Edge-TTS dubbing, FFmpeg & Swift overlays",
      category: "media"
    },
    {
      value: "Workflow",
      suffix: " Automation",
      label: "ERP, Slack & Data Ops",
      detail: "Node.js daily reporting, human-reviewed Slack LLM drafts, Playwright & Sheets sync",
      category: "ops"
    }
  ],

  projects: [
    {
      id: "saadaa-b2b-catalog",
      index: "01",
      title: "SAADAA B2B Wholesale Catalog & Admin Portal",
      shortTitle: "B2B Wholesale Catalog & Admin Portal",
      category: "fullstack",
      categoryLabel: "Full-Stack Web",
      badge: "Live Production Web App",
      status: "live",
      liveUrl: "https://saadaa-b2b-catalog.netlify.app",
      repoUrl: "https://github.com/kingsprayer/b2b-catalog-fulfillment-hub",
      headlineMetric: "TypeScript · Netlify Functions · Managed PostgreSQL · PWA",
      stack: [
        "TypeScript",
        "Netlify Functions",
        "PostgreSQL",
        "PWA / Service Worker",
        "Google Apps Script",
        "OpenXML (.xlsx)"
      ],
      summary:
        "Mobile-first B2B wholesale catalog storefront and internal order fulfillment portal backed by serverless Netlify Functions and Managed PostgreSQL.",
      highlights: [
        "Built a mobile-friendly B2B catalog storefront with Service Worker caching, a product-detail order panel, live multi-tier wholesale discount calculation, and interactive demo routes.",
        "Implemented serverless Netlify Functions connected to Managed PostgreSQL for idempotent order submission, domain-restricted @saadaa.in admin order views, Google Sheets live sync via Apps Script, CSV feeds, and multi-sheet .xlsx exports."
      ],
      specs: [
        { k: "Frontend", v: "Mobile-first PWA with Service Worker caching & order drawer" },
        { k: "Wholesale Logic", v: "Tiered bulk discount calculation with automatic attribution" },
        { k: "Backend API", v: "Serverless Netlify Functions + Managed PostgreSQL" },
        { k: "Ops Integration", v: "@saadaa.in admin view, Google Sheets sync & .xlsx exports" }
      ],
      architecture: {
        caption: "Mobile storefront feeding serverless order APIs, PostgreSQL storage, and spreadsheet fulfillment sync",
        nodes: [
          { title: "Catalog PWA", sub: "Mobile Storefront · SW Cache · Tiered Pricing" },
          { title: "Netlify Functions", sub: "Order Capture API · @saadaa.in Admin Auth" },
          { title: "Managed PostgreSQL", sub: "Relational Orders, SKUs & Fulfillment State" },
          { title: "Sheets & Excel Sync", sub: "Apps Script Push · CSV Feeds · .xlsx Export" }
        ]
      }
    },
    {
      id: "content-workflow-app",
      index: "02",
      title: "Internal Content Workflow & Asset Management App",
      shortTitle: "Internal Content Workflow App",
      category: "fullstack",
      categoryLabel: "Full-Stack Web",
      badge: "Internal Platform",
      status: "internal",
      headlineMetric: "Next.js · React · Strict TypeScript · Supabase · Vitest",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS",
        "Vercel Cron",
        "Vitest"
      ],
      summary:
        "Internal full-stack web application helping creative and marketing teams manage campaign requests, briefs, shoot schedules, edits, and approvals.",
      highlights: [
        "Built a full-lifecycle content management workflow in Next.js (App Router), React, strict TypeScript, Tailwind CSS, and Supabase PostgreSQL with Google OAuth / Magic Link sign-in and role-based access control.",
        "Added Postgres RPCs with advisory locking for collision-free sequential asset IDs, integrated Google Docs, Calendar sync, and SMTP email notifications, and covered core workflow rules with Vitest unit tests."
      ],
      specs: [
        { k: "Web Stack", v: "Next.js (App Router), React, strict TypeScript, Tailwind CSS" },
        { k: "Data & Auth", v: "Supabase PostgreSQL, RLS policies, Google OAuth & RBAC roles" },
        { k: "Reliability", v: "Advisory-locked Postgres RPCs for safe asset ID generation" },
        { k: "Integrations & Tests", v: "Google Docs/Calendar sync, Gmail SMTP, Vercel Cron, Vitest" }
      ],
      architecture: {
        caption: "Role-gated Next.js workflow interface backed by Supabase PostgreSQL, RPC locking, and Workspace sync",
        nodes: [
          { title: "Next.js + React UI", sub: "Campaign Briefs · Shoot Tracker · Review Queues" },
          { title: "Supabase PostgreSQL", sub: "Row-Level Security · Advisory-Locked Asset RPCs" },
          { title: "Workspace Integrations", sub: "Google Docs · Calendar Sync · SMTP Alerts" },
          { title: "Automated Testing", sub: "Vitest Unit Suite validating core business rules" }
        ]
      }
    },
    {
      id: "local-ai-photo-studio",
      index: "03",
      title: "Local AI Product Imagery Pipeline",
      shortTitle: "Local AI Imagery Pipeline",
      category: "ai",
      categoryLabel: "Applied AI & Vision",
      badge: "Apple Silicon PyTorch MPS",
      status: "internal",
      repoUrl: "https://github.com/kingsprayer/local-ai-photo-studio-mps",
      headlineMetric: "FastAPI · PyTorch MPS · SDXL / ControlNet · Ollama QA",
      stack: [
        "Python",
        "FastAPI",
        "PyTorch (MPS)",
        "SDXL / RealVisXL",
        "ControlNet",
        "SAM",
        "Real-ESRGAN",
        "Three.js",
        "Ollama"
      ],
      summary:
        "Self-hosted Apple Silicon image generation and batch review workflow built to assist product visuals while reducing reliance on paid image APIs.",
      highlights: [
        "Built a local FastAPI + PyTorch (MPS) pipeline supporting packshot, scene, and pose-guided modes using RealVisXL, ControlNet, SAM segmentation, and Real-ESRGAN upscaling, paired with WebSocket job updates and a Three.js pose helper.",
        "Added lightweight local VLM checks with Ollama (gemma3:4b), color-calibration steps, and a simple browser review gallery to streamline internal batch asset selection."
      ],
      specs: [
        { k: "Local Models", v: "PyTorch MPS · RealVisXL · ControlNet · SAM · Real-ESRGAN" },
        { k: "Controls & UX", v: "FastAPI WebSockets · Three.js pose guide · Review gallery" },
        { k: "Quality Checks", v: "Local Ollama (gemma3:4b) marketplace spec & color checks" },
        { k: "Purpose", v: "Assist routine e-commerce visuals locally without per-image API fees" }
      ],
      architecture: {
        caption: "Local Apple Silicon inference backend paired with browser pose controls and automated quality checks",
        nodes: [
          { title: "Pose & Batch Controls", sub: "Three.js Pose Helper · Packshot / Scene Modes" },
          { title: "FastAPI + PyTorch MPS", sub: "RealVisXL · ControlNet · SAM · Real-ESRGAN" },
          { title: "Local QA & Color Check", sub: "Ollama (gemma3:4b) · Color Calibration" },
          { title: "Review Gallery", sub: "WebSocket Progress · Internal Approval UI" }
        ]
      }
    },
    {
      id: "clipsort-ai",
      index: "04",
      title: "ClipSort — Automated Video Clip Segmentation Tool",
      shortTitle: "ClipSort Video Segmentation",
      category: "media",
      categoryLabel: "Media Pipelines",
      badge: "CV + Speech NLP Utility",
      status: "internal",
      repoUrl: "https://github.com/kingsprayer/clipsort-ai-video-studio",
      headlineMetric: "Python · Flask · OpenCV · Faster-Whisper · FFmpeg",
      stack: [
        "Python",
        "Flask",
        "OpenCV",
        "Faster-Whisper",
        "FFmpeg"
      ],
      summary:
        "Local Flask workstation combining computer vision and speech transcription to pre-sort raw shoot footage into structured editing folders.",
      highlights: [
        "Built a local Flask tool that segments long-form shoot recordings into contiguous clip bins (hooks, A-roll, B-roll, CTA, endscreens, and outtakes) so editors can review footage faster.",
        "Combined OpenCV visual cues (face/skin presence, gaze direction, scene cut detection, motion flow) with Faster-Whisper speech transcripts and lossless FFmpeg stream copying to avoid slow re-encoding."
      ],
      specs: [
        { k: "Classification Bins", v: "Hooks, A-Roll, B-Roll, CTA, Endscreens, Outtakes" },
        { k: "Vision Signals", v: "OpenCV face/skin tracking, scene cuts & optical flow" },
        { k: "Speech Layer", v: "Faster-Whisper local transcription & timestamp alignment" },
        { k: "Export Speed", v: "Lossless FFmpeg (-c copy) preserving source quality" }
      ],
      architecture: {
        caption: "Parallel OpenCV and Whisper analysis feeding fast lossless FFmpeg clip extraction",
        nodes: [
          { title: "Raw Shoot Ingest", sub: "Local Flask Interface · Threaded Processing" },
          { title: "OpenCV Frame Signals", sub: "Face & Gaze Cues · Histogram Cuts · Motion" },
          { title: "Faster-Whisper NLP", sub: "Timestamped Transcripts · Hook/CTA Detection" },
          { title: "Lossless FFmpeg Export", sub: "ffmpeg -c copy into structured edit folders" }
        ]
      }
    },
    {
      id: "multilingual-dubbing",
      index: "05",
      title: "Multilingual Video Localization & Motion Graphics Tools",
      shortTitle: "Multilingual Dubbing & Motion Tools",
      category: "media",
      categoryLabel: "Media Pipelines",
      badge: "Audio/Video Localization",
      status: "internal",
      repoUrl: "https://github.com/kingsprayer/multilingual-neural-video-dubbing",
      headlineMetric: "Demucs · Praat · Edge-TTS · Swift CoreGraphics · Resolve",
      stack: [
        "Python",
        "Demucs",
        "Edge-TTS",
        "Praat",
        "Swift",
        "DaVinci Resolve",
        "GSAP / Canvas2D",
        "FFmpeg"
      ],
      summary:
        "Audio/video localization scripts and motion-graphics templates built to adapt short-form ad creatives across English and regional Indian languages.",
      highlights: [
        "Built an automated dubbing pipeline using Demucs to isolate clean background music, Praat for pitch/loudness matching, Edge-TTS for regional voiceovers, and a native Swift CoreGraphics helper for crisp Indic-script text overlays.",
        "Created caption-aligned cutaway workflows, scripted DaVinci Resolve timeline builders, and reusable HTML5 Canvas/GSAP templates for procedural short-form reel graphics."
      ],
      specs: [
        { k: "Audio Pipeline", v: "Demucs BGM separation · Praat pitch/loudness normalization · Edge-TTS" },
        { k: "Script Rendering", v: "Native Swift CoreGraphics renderer for clean Indic typography" },
        { k: "Video Assembly", v: "FFmpeg compositing · ProRes alpha overlays · Caption alignment" },
        { k: "Motion Tooling", v: "Scripted DaVinci Resolve timelines · HTML5 Canvas/GSAP labs" }
      ],
      architecture: {
        caption: "Stem separation, regional voice synthesis, native Indic overlay rendering, and NLE assembly",
        nodes: [
          { title: "Demucs + Praat", sub: "Clean BGM Stems · Pitch & Loudness Matching" },
          { title: "Regional TTS Dubbing", sub: "English + Regional Indian Language Tracks" },
          { title: "Swift CoreGraphics", sub: "Native Indic-Script Broadcast Text Overlays" },
          { title: "NLE & Motion Export", sub: "DaVinci Resolve Scripts · Canvas/GSAP Graphics" }
        ]
      }
    },
    {
      id: "ops-automation-suite",
      index: "06",
      title: "Operations Reporting, Slack Assistant & Data Automation",
      shortTitle: "Ops Reporting & Slack AI Tools",
      category: "ops",
      categoryLabel: "Workflow Automation",
      badge: "Node.js · Python · LLMs",
      status: "internal",
      repoUrl: "https://github.com/kingsprayer/easycom-daily-kpi-slack",
      headlineMetric: "Node.js · Express · Gemini API · SQLite · Playwright",
      stack: [
        "Node.js",
        "Express",
        "Gemini API",
        "Claude API",
        "Playwright",
        "Airtable API",
        "SQLite",
        "Docker",
        "GitHub Actions"
      ],
      summary:
        "Practical internal automation covering scheduled marketplace KPI alerts, human-reviewed Slack replies, inventory analysis, and competitive tracking.",
      highlights: [
        "Rebuilt daily EasyEcom marketplace KPI reporting in Node.js with a lightweight Express dashboard and scheduled GitHub Actions Slack alerts, and created a Gemini-powered Slack assistant using SQLite and DM approval cards so team members review drafts before sending.",
        "Wrote Python and Playwright scripts to audit slow-moving inventory for B2B outreach, sync competitor ads to Airtable, draft social content queues, and summarize customer comment sentiment."
      ],
      specs: [
        { k: "Scheduled Reporting", v: "Node.js ETL · Express dashboard · GitHub Actions → Slack" },
        { k: "Human-in-the-Loop Bot", v: "Gemini 2.5 Flash · Slack Socket Mode · SQLite · DM Approvals" },
        { k: "Web & Data Scripts", v: "Playwright scrapers · Airtable sync · Dead-stock SKU review" },
        { k: "Deployment", v: "Docker containers, GitHub Actions cron & lightweight cloud hosting" }
      ],
      architecture: {
        caption: "Scheduled ERP reporting, human-approved Slack drafting, and automated market/inventory scripts",
        nodes: [
          { title: "Daily KPI ETL", sub: "Node.js · Express Dashboard · Scheduled Slack" },
          { title: "Slack Draft Assistant", sub: "Gemini API · SQLite · Human DM Approval Gate" },
          { title: "Data & Ad Scripts", sub: "Playwright · Airtable Sync · Sentiment Summaries" },
          { title: "Inventory Insights", sub: "Python SKU Audits supporting B2B Outreach" }
        ]
      }
    }
  ],

  experience: [
    {
      role: "AI & Full-Stack Automation Engineer",
      company: "Saadaa Design",
      companyUrl: "https://saadaa.in",
      companyDomain: "saadaa.in",
      period: "Aug 2026 – Present",
      location: "Jaipur, Rajasthan",
      type: "Full-Time · Engineering",
      summary:
        "Wearing multiple engineering hats at a fast-moving apparel brand—building web apps, internal workflow tooling, local AI/media utilities, and operational scripts.",
      tracks: [
        {
          title: "B2B Wholesale Web Platform",
          metric: "Live on Netlify",
          body: "Built and deployed a mobile-first B2B catalog and internal admin portal (saadaa-b2b-catalog.netlify.app) using TypeScript, Netlify Functions, and Managed PostgreSQL with tiered pricing, @saadaa.in admin login, and Google Sheets / .xlsx export sync."
        },
        {
          title: "Internal Content Workflow App",
          metric: "Next.js · Supabase · Vitest",
          body: "Built an internal asset and campaign tracking app in Next.js, React, strict TypeScript, and Supabase PostgreSQL with role-based permissions, advisory-locked asset IDs, Google Workspace integrations, and Vitest unit tests."
        },
        {
          title: "Local AI & Media Processing Tools",
          metric: "Python · PyTorch · FFmpeg",
          body: "Built local Apple Silicon workflows (FastAPI, PyTorch MPS, SDXL/ControlNet, SAM, Ollama) to support batch product imagery, plus Flask/OpenCV/Whisper clip sorting and regional language video dubbing scripts."
        },
        {
          title: "Operations, Slack & Data Automation",
          metric: "Node.js · Gemini · Playwright",
          body: "Maintained Node.js daily ERP KPI Slack reports, built a human-in-the-loop Gemini Slack draft assistant (SQLite + DM approval cards), and wrote Python/Playwright scripts for inventory analysis and social sentiment tracking."
        }
      ]
    },
    {
      role: "Software & QA Automation Intern",
      company: "Cynbit Technologies",
      companyUrl: null,
      companyDomain: null,
      period: "Jun 2024 – Aug 2024",
      location: "Jaipur, Rajasthan",
      type: "Internship · Software & QA",
      summary:
        "Focused on automated end-to-end UI testing, Python data validation scripts, and collaborating on responsive web interfaces.",
      tracks: [
        {
          title: "End-to-End UI Testing",
          metric: "~35% Faster Checks",
          body: "Automated end-to-end UI test and verification flows for client web applications, cutting routine regression testing turnaround by roughly 35%."
        },
        {
          title: "Python Validation Scripts",
          metric: "Data & Workflow Ops",
          body: "Wrote Python scripts for structured data validation and routine workflow automation across engineering teams."
        },
        {
          title: "QA Tooling & Responsive UI",
          metric: "Cross-Team Delivery",
          body: "Assisted with prompt-based test case drafting and collaborated with senior developers on responsive UI/UX fixes."
        }
      ]
    }
  ],

  skills: [
    {
      id: "languages",
      category: "Languages & Core CS",
      items: [
        { name: "Python", projects: ["local-ai-photo-studio", "clipsort-ai", "multilingual-dubbing", "ops-automation-suite"] },
        { name: "TypeScript", projects: ["saadaa-b2b-catalog", "content-workflow-app"] },
        { name: "JavaScript (ES6+)", projects: ["saadaa-b2b-catalog", "ops-automation-suite"] },
        { name: "SQL", projects: ["saadaa-b2b-catalog", "content-workflow-app", "ops-automation-suite"] },
        { name: "Swift", projects: ["multilingual-dubbing"] },
        { name: "C", projects: [] },
        { name: "HTML5 & CSS3", projects: ["saadaa-b2b-catalog", "content-workflow-app", "multilingual-dubbing"] },
        { name: "DSA", projects: ["content-workflow-app", "clipsort-ai"] }
      ]
    },
    {
      id: "fullstack",
      category: "Full-Stack & Cloud",
      items: [
        { name: "Next.js (App Router)", projects: ["content-workflow-app"] },
        { name: "React", projects: ["content-workflow-app"] },
        { name: "Node.js", projects: ["ops-automation-suite", "saadaa-b2b-catalog"] },
        { name: "Express", projects: ["ops-automation-suite"] },
        { name: "FastAPI", projects: ["local-ai-photo-studio", "ops-automation-suite"] },
        { name: "Flask", projects: ["clipsort-ai"] },
        { name: "Tailwind CSS", projects: ["content-workflow-app"] },
        { name: "PostgreSQL", projects: ["saadaa-b2b-catalog", "content-workflow-app"] },
        { name: "Supabase (Auth / RLS / RPC)", projects: ["content-workflow-app"] },
        { name: "Netlify Functions", projects: ["saadaa-b2b-catalog"] },
        { name: "SQLite", projects: ["ops-automation-suite"] },
        { name: "Docker", projects: ["ops-automation-suite"] },
        { name: "Git & GitHub Actions", projects: ["saadaa-b2b-catalog", "ops-automation-suite"] },
        { name: "REST & WebSockets", projects: ["saadaa-b2b-catalog", "local-ai-photo-studio"] },
        { name: "Vitest", projects: ["content-workflow-app"] }
      ]
    },
    {
      id: "ai",
      category: "AI, Vision & Audio",
      items: [
        { name: "Gemini API", projects: ["ops-automation-suite"] },
        { name: "Claude API", projects: ["ops-automation-suite"] },
        { name: "PyTorch (MPS)", projects: ["local-ai-photo-studio"] },
        { name: "SDXL / RealVisXL", projects: ["local-ai-photo-studio"] },
        { name: "ControlNet", projects: ["local-ai-photo-studio"] },
        { name: "SAM & Florence-2", projects: ["local-ai-photo-studio"] },
        { name: "Real-ESRGAN", projects: ["local-ai-photo-studio"] },
        { name: "Ollama", projects: ["local-ai-photo-studio"] },
        { name: "OpenCV", projects: ["clipsort-ai"] },
        { name: "Faster-Whisper", projects: ["clipsort-ai"] },
        { name: "Demucs", projects: ["multilingual-dubbing"] },
        { name: "Praat & Edge-TTS", projects: ["multilingual-dubbing"] }
      ]
    },
    {
      id: "automation",
      category: "Automation, Data & Creative Tech",
      items: [
        { name: "Playwright & Selenium", projects: ["ops-automation-suite"] },
        { name: "BeautifulSoup", projects: ["ops-automation-suite"] },
        { name: "Google Sheets / Apps Script", projects: ["saadaa-b2b-catalog"] },
        { name: "OpenXML (.xlsx)", projects: ["saadaa-b2b-catalog"] },
        { name: "Airtable API", projects: ["ops-automation-suite"] },
        { name: "Streamlit", projects: [] },
        { name: "Three.js / WebGL", projects: ["local-ai-photo-studio"] },
        { name: "FFmpeg", projects: ["clipsort-ai", "multilingual-dubbing"] },
        { name: "GSAP / Canvas2D", projects: ["multilingual-dubbing"] },
        { name: "DaVinci Resolve Scripting", projects: ["multilingual-dubbing"] },
        { name: "UI/UX & WCAG Accessibility", projects: ["saadaa-b2b-catalog", "content-workflow-app"] },
        { name: "Delta-E Color Calibration", projects: ["local-ai-photo-studio"] }
      ]
    }
  ],

  labs: [
    {
      title: "SpectraCraft Color Studio",
      domain: "Color Tools & Accessibility",
      spec: "Eyedropper · Palette Extractor · WCAG AA/AAA",
      repoUrl: "https://github.com/kingsprayer/spectracraft-color-studio",
      description:
        "Lightweight browser utility for sampling colors, extracting dominant image palettes, and checking WCAG AA/AAA text contrast."
    },
    {
      title: "Color Calibration & Ad Pack Tooling",
      domain: "Color Science & Production",
      spec: "Delta-E Checks · Multi-Ratio Ad Templates",
      description:
        "Practical color-matching reference and multi-ratio creative formatting helpers used to keep catalog shoots and social packs consistent."
    },
    {
      title: "Saadaa Hookd",
      domain: "Internal Data App",
      spec: "Streamlit · SQLite",
      description:
        "Simple searchable Streamlit + SQLite app built to organize and tag marketing copy hooks for quick reference."
    },
    {
      title: "PULSE AI DJ Studio",
      domain: "Web Audio & Python DSP",
      spec: "Browser Mixer · Python Auto-Mixer",
      description:
        "Fun interactive Web Audio DJ workstation paired with a Python DSP script experimenting with tempo-matched transitions."
    },
    {
      title: "Large-Format Print Layout Pipeline",
      domain: "Print & Vector Automation",
      spec: "High-Res Raster + Vector PDF/SVG",
      description:
        "Automated print-ready standee generation combining high-DPI imagery with clean vector PDF/SVG typography."
    },
    {
      title: "Mac arm64 C Benchmark",
      domain: "Systems Exploration",
      spec: "Native C · CPU / RAM / Disk",
      description:
        "Small native C benchmark written to test sustained CPU, memory, and SSD performance on Apple Silicon."
    },
    {
      title: "3D WebGL Portfolio Experiment",
      domain: "Creative Coding",
      spec: "Three.js · Glassmorphic UI",
      description:
        "Interactive Three.js browser experiment exploring 3D scenes, lighting, and translucent interface components."
    }
  ],

  education: {
    degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    institution: "Poornima College of Engineering",
    graduation: "Class of 2026",
    location: "Jaipur, Rajasthan",
    coursework: [
      "Data Structures & Algorithms (DSA)",
      "Artificial Intelligence & Machine Learning",
      "Web Development",
      "UI/UX Design",
      "Data Analysis"
    ]
  },

  certifications: [
    {
      title: "AI / Prompt Engineer",
      detail: "Prompt structuring, multimodal LLM workflows, and practical automation"
    },
    {
      title: "Data Science with Python",
      detail: "Data analysis pipelines, modeling, and statistical visualization"
    },
    {
      title: "UI / UX Developer",
      detail: "Interface architecture, design systems, wireframing, and usability testing"
    },
    {
      title: "Strategy Consulting Virtual Experience",
      detail: "Market research, structured problem solving, and executive reporting"
    }
  ]
};
