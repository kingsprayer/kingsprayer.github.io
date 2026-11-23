/**
 * Interactive Controller for Anuj Sharma's Portfolio
 * Zero external runtime dependencies · Accessible · Grounded
 */

(function () {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  // ── Utilities ──────────────────────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  let toastTimer = null;
  function showToast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2300);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(DATA.profile.email);
      showToast("Copied " + DATA.profile.email);
    } catch {
      window.location.href = "mailto:" + DATA.profile.email;
    }
  }

  // ── Theme Toggle ───────────────────────────────────────────────────────
  function initTheme() {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;
    const syncIcon = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.innerHTML = dark
        ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>'
        : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    };
    syncIcon();
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (next === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      try {
        localStorage.setItem("as-portfolio-theme", next);
      } catch (e) {}
      syncIcon();
      showToast(next === "dark" ? "Obsidian Studio theme" : "Warm Editorial Paper theme");
    });
  }

  // ── Hero Architecture Blueprint Explorer ───────────────────────────────
  function renderBlueprint(projectId) {
    const body = document.getElementById("blueprintBody");
    if (!body) return;
    const project = DATA.projects.find((p) => p.id === projectId) || DATA.projects[0];
    if (!project) return;

    const nodesHtml = project.architecture.nodes
      .map(
        (node, idx) => `
          <div class="bp-node">
            <span class="bp-node-idx">0${idx + 1}</span>
            <div>
              <div class="bp-node-title">${escapeHtml(node.title)}</div>
              <div class="bp-node-sub">${escapeHtml(node.sub)}</div>
            </div>
          </div>
        `
      )
      .join("");

    body.innerHTML = `
      <div class="bp-header-row">
        <h3 class="bp-title">${escapeHtml(project.shortTitle)}</h3>
        <span class="bp-metric-tag">${escapeHtml(project.badge)}</span>
      </div>
      <div class="bp-pipeline">${nodesHtml}</div>
      <div class="bp-footer">
        <p class="bp-caption">${escapeHtml(project.architecture.caption)}</p>
        <button type="button" class="project-action" data-open-project="${escapeHtml(project.id)}">
          Inspect →
        </button>
      </div>
    `;

    const inspectBtn = body.querySelector("[data-open-project]");
    if (inspectBtn) {
      inspectBtn.addEventListener("click", () => openProjectDrawer(project.id));
    }
  }

  function initBlueprint() {
    const tabs = document.querySelectorAll("#blueprintTabs .bp-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        renderBlueprint(tab.getAttribute("data-project-id"));
      });
    });
    renderBlueprint(DATA.projects[0].id);
  }

  // ── Versatility Pillars Strip ──────────────────────────────────────────
  function renderPillars() {
    const grid = document.getElementById("pillarsGrid");
    if (!grid) return;

    grid.innerHTML = DATA.pillars
      .map(
        (item) => `
          <button type="button" class="metric-card" data-jump-category="${escapeHtml(item.category)}">
            <div class="metric-value">${escapeHtml(item.value)}<span>${escapeHtml(item.suffix)}</span></div>
            <div class="metric-label">${escapeHtml(item.label)}</div>
            <div class="metric-detail">${escapeHtml(item.detail)}</div>
          </button>
        `
      )
      .join("");

    grid.querySelectorAll("[data-jump-category]").forEach((card) => {
      card.addEventListener("click", () => {
        const cat = card.getAttribute("data-jump-category");
        setProjectFilter(cat);
        const sec = document.getElementById("projects");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // ── Projects Grid & Filtering ──────────────────────────────────────────
  let activeFilter = "all";
  let highlightedProjectIds = new Set();

  function setProjectFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll("#projectFilters .filter-pill").forEach((pill) => {
      pill.classList.toggle("is-active", pill.getAttribute("data-filter") === filter);
    });
    renderProjects();
  }

  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    const list =
      activeFilter === "all"
        ? DATA.projects
        : DATA.projects.filter((p) => p.category === activeFilter);

    grid.innerHTML = list
      .map((p) => {
        const isLive = p.status === "live" && p.liveUrl;
        const isHighlighted = highlightedProjectIds.has(p.id);
        return `
          <article class="project-card ${isHighlighted ? "is-highlighted" : ""}" data-project-card="${escapeHtml(p.id)}">
            <div class="project-top">
              <span class="project-index">${escapeHtml(p.index)} · ${escapeHtml(p.categoryLabel)}</span>
              <span class="project-badge ${isLive ? "project-badge--live" : ""}">
                ${isLive ? "● " : ""}${escapeHtml(p.badge)}
              </span>
            </div>

            <h3 class="project-title">${escapeHtml(p.title)}</h3>
            <div class="project-metric-bar">${escapeHtml(p.headlineMetric)}</div>
            <p class="project-summary">${escapeHtml(p.summary)}</p>

            <div class="stack-chips">
              ${p.stack.map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
            </div>

            <div class="project-footer">
              <button type="button" class="project-action" data-open-drawer="${escapeHtml(p.id)}">
                View Architecture &amp; Notes →
              </button>
              <div style="display:flex; gap:0.85rem; align-items:center; flex-wrap:wrap;">
                ${
                  p.repoUrl
                    ? `<a class="live-link-inline" style="color: var(--ink-muted);" href="${escapeHtml(p.repoUrl)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
                    : ""
                }
                ${
                  isLive
                    ? `<a class="live-link-inline" href="${escapeHtml(p.liveUrl)}" target="_blank" rel="noopener noreferrer">Live App ↗</a>`
                    : ""
                }
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-open-drawer]").forEach((btn) => {
      btn.addEventListener("click", () => openProjectDrawer(btn.getAttribute("data-open-drawer")));
    });
  }

  function initProjectFilters() {
    document.querySelectorAll("#projectFilters .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => setProjectFilter(pill.getAttribute("data-filter")));
    });
    renderProjects();
  }

  // ── Project Architecture Drawer ────────────────────────────────────────
  let currentDrawerId = null;

  function openProjectDrawer(projectId) {
    const project = DATA.projects.find((p) => p.id === projectId);
    if (!project) return;
    currentDrawerId = project.id;

    const backdrop = document.getElementById("drawerBackdrop");
    const panel = document.getElementById("projectDrawer");
    const body = document.getElementById("drawerBody");
    const idxEl = document.getElementById("drawerIndex");
    if (!backdrop || !panel || !body) return;

    const isLive = project.status === "live" && project.liveUrl;
    if (idxEl) idxEl.textContent = `PROJECT ${project.index} · ${project.categoryLabel.toUpperCase()}`;

    const nodesHtml = project.architecture.nodes
      .map(
        (node, i) => `
          <div class="bp-node">
            <span class="bp-node-idx">0${i + 1}</span>
            <div>
              <div class="bp-node-title">${escapeHtml(node.title)}</div>
              <div class="bp-node-sub">${escapeHtml(node.sub)}</div>
            </div>
          </div>
        `
      )
      .join("");

    const specsHtml = project.specs
      .map(
        (row) => `
          <div class="drawer-spec-row">
            <span class="drawer-spec-key">${escapeHtml(row.k)}</span>
            <span>${escapeHtml(row.v)}</span>
          </div>
        `
      )
      .join("");

    body.innerHTML = `
      <span class="project-badge ${isLive ? "project-badge--live" : ""}">
        ${isLive ? "● " : ""}${escapeHtml(project.badge)}
      </span>
      <h2 class="drawer-title" id="drawerTitle">${escapeHtml(project.title)}</h2>
      <p class="project-summary" style="margin-bottom: 1rem;">${escapeHtml(project.summary)}</p>

      ${
        isLive || project.repoUrl
          ? `<div style="display:flex; flex-wrap:wrap; gap:0.6rem; margin-bottom: 1rem;">
              ${
                isLive
                  ? `<a class="btn btn--accent btn--sm" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">
                      Open Live Platform (${escapeHtml(DATA.profile.livePlatformLabel)}) ↗
                    </a>`
                  : ""
              }
              ${
                project.repoUrl
                  ? `<a class="btn btn--outline btn--sm" href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer">
                      View Source on GitHub ↗
                    </a>`
                  : ""
              }
            </div>`
          : ""
      }

      <h3 class="drawer-section-label">System Flow</h3>
      <div class="bp-pipeline">${nodesHtml}</div>

      <h3 class="drawer-section-label">Key Specifications</h3>
      <div class="drawer-specs">${specsHtml}</div>

      <h3 class="drawer-section-label">Engineering Notes</h3>
      <ul class="drawer-bullets">
        ${project.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>

      <h3 class="drawer-section-label">Technologies Used</h3>
      <div class="stack-chips">
        ${project.stack.map((tech) => `<span class="chip">${escapeHtml(tech)}</span>`).join("")}
      </div>
    `;

    backdrop.classList.add("is-open");
    panel.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#project/" + project.id);
    }
  }

  function closeProjectDrawer() {
    const backdrop = document.getElementById("drawerBackdrop");
    const panel = document.getElementById("projectDrawer");
    if (!backdrop || !panel) return;
    backdrop.classList.remove("is-open");
    panel.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentDrawerId = null;

    if (window.location.hash.startsWith("#project/") && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#projects");
    }
  }

  function stepDrawer(delta) {
    if (!currentDrawerId) return;
    const idx = DATA.projects.findIndex((p) => p.id === currentDrawerId);
    if (idx === -1) return;
    const nextIdx = (idx + delta + DATA.projects.length) % DATA.projects.length;
    openProjectDrawer(DATA.projects[nextIdx].id);
  }

  function initDrawer() {
    const closeBtn = document.getElementById("closeDrawerBtn");
    const backdrop = document.getElementById("drawerBackdrop");
    const prevBtn = document.getElementById("drawerPrevBtn");
    const nextBtn = document.getElementById("drawerNextBtn");

    if (closeBtn) closeBtn.addEventListener("click", closeProjectDrawer);
    if (backdrop) backdrop.addEventListener("click", closeProjectDrawer);
    if (prevBtn) prevBtn.addEventListener("click", () => stepDrawer(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => stepDrawer(1));

    // Support direct deep link like #project/saadaa-b2b-catalog
    if (window.location.hash.startsWith("#project/")) {
      const id = window.location.hash.replace("#project/", "").trim();
      if (DATA.projects.some((p) => p.id === id)) {
        openProjectDrawer(id);
      }
    }
  }

  // ── Work Experience ────────────────────────────────────────────────────
  function renderExperience() {
    const container = document.getElementById("experienceList");
    if (!container) return;

    container.innerHTML = DATA.experience
      .map((exp) => {
        const companyHtml = exp.companyUrl
          ? `<a href="${escapeHtml(exp.companyUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(exp.company)} (${escapeHtml(exp.companyDomain)}) ↗</a>`
          : escapeHtml(exp.company);

        const gridMod = exp.tracks.length === 3 ? "exp-tracks-grid--3" : "";

        return `
          <article class="exp-card">
            <div class="exp-head">
              <div>
                <h3 class="exp-role">${escapeHtml(exp.role)}</h3>
                <div class="exp-company">${companyHtml}</div>
              </div>
              <div class="exp-meta">
                <span class="exp-meta-badge">${escapeHtml(exp.period)}</span><br />
                <span>${escapeHtml(exp.location)} · ${escapeHtml(exp.type)}</span>
              </div>
            </div>
            <p class="project-summary" style="margin-bottom: 1.2rem;">${escapeHtml(exp.summary)}</p>
            <div class="exp-tracks-grid ${gridMod}">
              ${exp.tracks
                .map(
                  (t) => `
                    <div class="exp-track">
                      <div class="exp-track-head">
                        <h4 class="exp-track-title">${escapeHtml(t.title)}</h4>
                        <span class="exp-track-metric">${escapeHtml(t.metric)}</span>
                      </div>
                      <p class="exp-track-body">${escapeHtml(t.body)}</p>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
        `;
      })
      .join("");
  }

  // ── Interactive Capability Matrix (Skills Cross-Highlighter) ───────────
  let selectedSkillName = null;

  function renderSkills(searchTerm = "") {
    const grid = document.getElementById("skillsGrid");
    if (!grid) return;

    const q = searchTerm.trim().toLowerCase();

    grid.innerHTML = DATA.skills
      .map((group) => {
        const pillsHtml = group.items
          .map((item) => {
            const matchSearch = !q || item.name.toLowerCase().includes(q) || group.category.toLowerCase().includes(q);
            const isSelected = selectedSkillName === item.name;
            return `
              <button
                type="button"
                class="skill-pill ${isSelected ? "is-selected" : ""} ${!matchSearch ? "is-dimmed" : ""}"
                data-skill-name="${escapeHtml(item.name)}"
                data-skill-projects="${escapeHtml(item.projects.join(","))}"
              >
                ${escapeHtml(item.name)}
              </button>
            `;
          })
          .join("");

        return `
          <div class="skill-group">
            <div class="skill-group-head">
              <h3 class="skill-group-title">${escapeHtml(group.category)}</h3>
              <span class="skill-group-count">${group.items.length} tools</span>
            </div>
            <div class="skill-pills">${pillsHtml}</div>
          </div>
        `;
      })
      .join("");

    grid.querySelectorAll(".skill-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        const name = pill.getAttribute("data-skill-name");
        const projAttr = pill.getAttribute("data-skill-projects") || "";
        const ids = projAttr ? projAttr.split(",").filter(Boolean) : [];

        if (selectedSkillName === name) {
          selectedSkillName = null;
          highlightedProjectIds = new Set();
        } else {
          selectedSkillName = name;
          highlightedProjectIds = new Set(ids);
        }

        updateSkillBanner(selectedSkillName, ids);
        renderSkills(document.getElementById("skillSearchInput")?.value || "");
        renderProjects();
      });
    });
  }

  function updateSkillBanner(skillName, projectIds) {
    const banner = document.getElementById("skillMatchBanner");
    const textEl = document.getElementById("skillMatchText");
    const linksEl = document.getElementById("skillMatchLinks");
    if (!banner || !textEl || !linksEl) return;

    if (!skillName) {
      banner.classList.remove("is-visible");
      return;
    }

    const matchedProjects = DATA.projects.filter((p) => projectIds.includes(p.id));
    banner.classList.add("is-visible");

    if (matchedProjects.length === 0) {
      textEl.innerHTML = `<strong>${escapeHtml(skillName)}</strong> is used across my labs and systems experiments.`;
      linksEl.innerHTML = `<button type="button" class="btn btn--outline btn--sm" id="clearSkillSel">Clear</button>`;
    } else {
      textEl.innerHTML = `<strong>${escapeHtml(skillName)}</strong> is used in ${matchedProjects.length} featured project${matchedProjects.length > 1 ? "s" : ""}:`;
      linksEl.innerHTML =
        matchedProjects
          .map(
            (p) =>
              `<button type="button" class="btn btn--outline btn--sm" data-open-from-skill="${escapeHtml(p.id)}">${escapeHtml(p.shortTitle)} →</button>`
          )
          .join("") + `<button type="button" class="btn btn--sm" id="clearSkillSel">Clear</button>`;

      linksEl.querySelectorAll("[data-open-from-skill]").forEach((btn) => {
        btn.addEventListener("click", () => openProjectDrawer(btn.getAttribute("data-open-from-skill")));
      });
    }

    const clearBtn = document.getElementById("clearSkillSel");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        selectedSkillName = null;
        highlightedProjectIds = new Set();
        banner.classList.remove("is-visible");
        renderSkills(document.getElementById("skillSearchInput")?.value || "");
        renderProjects();
      });
    }
  }

  function initSkills() {
    const input = document.getElementById("skillSearchInput");
    if (input) {
      input.addEventListener("input", () => renderSkills(input.value));
    }
    renderSkills();
  }

  // ── Creative Labs + Live WCAG / CIE76 Delta-E Calculator ──────────────
  function renderLabs() {
    const grid = document.getElementById("labsGrid");
    if (!grid) return;

    grid.innerHTML = DATA.labs
      .map(
        (lab) => `
          <article class="lab-card">
            <div class="lab-domain">${escapeHtml(lab.domain)}</div>
            <h3 class="lab-title">${escapeHtml(lab.title)}</h3>
            <div class="lab-spec">${escapeHtml(lab.spec)}</div>
            <p class="lab-desc">${escapeHtml(lab.description)}</p>
            ${
              lab.repoUrl
                ? `<div style="margin-top:0.6rem;"><a class="live-link-inline" style="color:var(--accent);" href="${escapeHtml(lab.repoUrl)}" target="_blank" rel="noopener noreferrer">GitHub Repo ↗</a></div>`
                : ""
            }
          </article>
        `
      )
      .join("");
  }

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }

  function relativeLuminance({ r, g, b }) {
    const toLin = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  }

  function rgbToLab({ r, g, b }) {
    const toLin = (c) => {
      const s = c / 255;
      return s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92;
    };
    const rl = toLin(r), gl = toLin(g), bl = toLin(b);
    let x = (rl * 0.4124 + gl * 0.3576 + bl * 0.1805) / 0.95047;
    let y = (rl * 0.2126 + gl * 0.7152 + bl * 0.0722) / 1.0;
    let z = (rl * 0.0193 + gl * 0.1192 + bl * 0.9505) / 1.08883;
    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    x = f(x);
    y = f(y);
    z = f(z);
    return { L: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
  }

  function initColorLab() {
    const fgPicker = document.getElementById("fgColorPicker");
    const bgPicker = document.getElementById("bgColorPicker");
    const fgHexLabel = document.getElementById("fgHexLabel");
    const bgHexLabel = document.getElementById("bgHexLabel");
    const stage = document.getElementById("colorPreviewStage");
    const ratioEl = document.getElementById("contrastRatioVal");
    const deltaEl = document.getElementById("deltaEVal");
    const badgesEl = document.getElementById("wcagBadges");
    if (!fgPicker || !bgPicker || !stage) return;

    function update() {
      const fgHex = fgPicker.value;
      const bgHex = bgPicker.value;
      fgHexLabel.textContent = fgHex.toUpperCase();
      bgHexLabel.textContent = bgHex.toUpperCase();

      stage.style.color = fgHex;
      stage.style.backgroundColor = bgHex;

      const fgRgb = hexToRgb(fgHex);
      const bgRgb = hexToRgb(bgHex);
      const l1 = relativeLuminance(fgRgb);
      const l2 = relativeLuminance(bgRgb);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

      const lab1 = rgbToLab(fgRgb);
      const lab2 = rgbToLab(bgRgb);
      const dE = Math.sqrt(
        Math.pow(lab1.L - lab2.L, 2) +
          Math.pow(lab1.a - lab2.a, 2) +
          Math.pow(lab1.b - lab2.b, 2)
      );

      ratioEl.textContent = ratio.toFixed(2) + " : 1";
      deltaEl.textContent = dE.toFixed(1);

      const checks = [
        { label: "AA Normal (4.5:1)", ok: ratio >= 4.5 },
        { label: "AAA Normal (7:1)", ok: ratio >= 7.0 },
        { label: "AA Large (3:1)", ok: ratio >= 3.0 }
      ];
      badgesEl.innerHTML = checks
        .map(
          (c) =>
            `<span class="wcag-badge ${c.ok ? "pass" : "fail"}">${c.ok ? "✓" : "✕"} ${c.label}</span>`
        )
        .join("");
    }

    fgPicker.addEventListener("input", update);
    bgPicker.addEventListener("input", update);
    update();
  }

  // ── Education & Certifications ─────────────────────────────────────────
  function renderEducation() {
    const wrap = document.getElementById("educationSection");
    if (!wrap) return;
    const edu = DATA.education;

    wrap.innerHTML = `
      <article class="edu-card">
        <h3 class="edu-degree">${escapeHtml(edu.degree)}</h3>
        <div class="edu-school">${escapeHtml(edu.institution)}</div>
        <div class="edu-meta">${escapeHtml(edu.graduation)} · ${escapeHtml(edu.location)}</div>
        <p class="edu-coursework-label">Relevant Coursework</p>
        <div class="stack-chips">
          ${edu.coursework.map((c) => `<span class="chip">${escapeHtml(c)}</span>`).join("")}
        </div>
      </article>

      <div class="certs-grid">
        ${DATA.certifications
          .map(
            (cert) => `
              <article class="cert-card">
                <h3 class="cert-title">${escapeHtml(cert.title)}</h3>
                <p class="cert-detail">${escapeHtml(cert.detail)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  // ── Command Palette (⌘K / Ctrl+K) ──────────────────────────────────────
  function initCommandPalette() {
    const backdrop = document.getElementById("cmdkBackdrop");
    const input = document.getElementById("cmdkInput");
    const listEl = document.getElementById("cmdkList");
    const openBtn = document.getElementById("openCmdkBtn");
    if (!backdrop || !input || !listEl) return;

    const actions = [
      ...DATA.projects.map((p) => ({
        label: `Project: ${p.title}`,
        type: "Case Study",
        run: () => openProjectDrawer(p.id)
      })),
      { label: "Open 1-Page Resume (Web)", type: "Document", run: () => (window.location.href = "resume.html") },
      { label: "Open Full 2-Page CV (Web)", type: "Document", run: () => (window.location.href = "cv.html") },
      {
        label: "Download 1-Page Resume PDF",
        type: "PDF",
        run: () => window.open("Anuj_Sharma_Resume_2026.pdf", "_blank")
      },
      {
        label: "Download Full 2-Page CV PDF",
        type: "PDF",
        run: () => window.open("Anuj_Sharma_CV_2026.pdf", "_blank")
      },
      {
        label: "Open Live B2B Catalog App",
        type: "External",
        run: () => window.open(DATA.profile.livePlatformUrl, "_blank", "noopener,noreferrer")
      },
      { label: "Copy Email (anuj23012004@gmail.com)", type: "Action", run: copyEmail },
      {
        label: "Toggle Light / Dark Theme",
        type: "Theme",
        run: () => document.getElementById("themeToggleBtn")?.click()
      },
      { label: "Jump to Work Experience", type: "Section", run: () => (window.location.hash = "#experience") },
      { label: "Jump to Technical Skills", type: "Section", run: () => (window.location.hash = "#skills") },
      { label: "Jump to Side Projects & Color Lab", type: "Section", run: () => (window.location.hash = "#labs") },
      { label: "Jump to Contact", type: "Section", run: () => (window.location.hash = "#contact") }
    ];

    let focusedIdx = 0;
    let filtered = actions;

    function renderList(query = "") {
      const q = query.trim().toLowerCase();
      filtered = q ? actions.filter((a) => a.label.toLowerCase().includes(q) || a.type.toLowerCase().includes(q)) : actions;
      focusedIdx = 0;

      if (filtered.length === 0) {
        listEl.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--ink-muted); font-size: 0.85rem;">No matching command.</div>`;
        return;
      }

      listEl.innerHTML = filtered
        .map(
          (item, i) => `
            <button type="button" class="cmdk-item ${i === 0 ? "is-focused" : ""}" data-cmdk-idx="${i}">
              <span>${escapeHtml(item.label)}</span>
              <span class="cmdk-item-type">${escapeHtml(item.type)}</span>
            </button>
          `
        )
        .join("");

      listEl.querySelectorAll(".cmdk-item").forEach((btn) => {
        btn.addEventListener("click", () => {
          const i = Number(btn.getAttribute("data-cmdk-idx"));
          closeCmdk();
          filtered[i]?.run();
        });
      });
    }

    function openCmdk() {
      backdrop.classList.add("is-open");
      input.value = "";
      renderList("");
      setTimeout(() => input.focus(), 20);
    }

    function closeCmdk() {
      backdrop.classList.remove("is-open");
    }

    if (openBtn) openBtn.addEventListener("click", openCmdk);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeCmdk();
    });

    input.addEventListener("input", () => renderList(input.value));
    input.addEventListener("keydown", (e) => {
      const items = listEl.querySelectorAll(".cmdk-item");
      if (!items.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        focusedIdx = (focusedIdx + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        focusedIdx = (focusedIdx - 1 + items.length) % items.length;
      } else if (e.key === "Enter") {
        e.preventDefault();
        closeCmdk();
        filtered[focusedIdx]?.run();
        return;
      } else {
        return;
      }
      items.forEach((el, idx) => el.classList.toggle("is-focused", idx === focusedIdx));
      items[focusedIdx]?.scrollIntoView({ block: "nearest" });
    });

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        backdrop.classList.contains("is-open") ? closeCmdk() : openCmdk();
      } else if (e.key === "Escape") {
        if (backdrop.classList.contains("is-open")) closeCmdk();
        else if (currentDrawerId) closeProjectDrawer();
      } else if (currentDrawerId && !backdrop.classList.contains("is-open")) {
        if (e.key === "ArrowRight") stepDrawer(1);
        if (e.key === "ArrowLeft") stepDrawer(-1);
      }
    });
  }

  // ── Mobile Menu, Active Scrollspy & Copy Handlers ─────────────────────
  function initNavAndContact() {
    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", () => {
        const open = navLinks.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", String(open));
      });
      navLinks.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          navLinks.classList.remove("is-open");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    const sections = ["projects", "experience", "skills", "labs", "education", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              document.querySelectorAll("#navLinks a").forEach((a) => {
                a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
              });
            }
          });
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      sections.forEach((s) => obs.observe(s));
    }

    document.getElementById("copyEmailFooterBtn")?.addEventListener("click", copyEmail);
    document.getElementById("heroEmailCopy")?.addEventListener("click", (e) => {
      e.preventDefault();
      copyEmail();
    });
  }

  // ── Bootstrap ──────────────────────────────────────────────────────────
  initTheme();
  initBlueprint();
  renderPillars();
  initProjectFilters();
  initDrawer();
  renderExperience();
  initSkills();
  renderLabs();
  initColorLab();
  renderEducation();
  initCommandPalette();
  initNavAndContact();
})();
