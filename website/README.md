# Rex Li — Portfolio Website

This folder is the canonical, deployable website root. The homepage and project detail use the established personal-site design. Listener contains a minimal Nanjing map entry and the approved listening pages with self-contained media and measured acoustic-change progress lines.

## Local preview

From this directory run `python3 serve.py`, then open `http://127.0.0.1:8770/`. This server supports HTTP byte ranges, required for reliable audio/video seeking. A deployed static host must also support range requests.

## Structure

- `index.html` — canonical portfolio homepage
- `project-detail.html` — canonical project detail pages
- `machine-lab-report.html` — A Machine for Misunderstanding lab report and experiment process
- `data/projects.json` — project metadata for future data-driven page rendering
- `assets/covers/` — homepage and project cover images
- `assets/docs/` — documents linked from project pages
- `projects/listener/` — Listener map and four listening pages: `yihe/`, `deji/`, `jiuhua/`, `new-city/`
- `archive/` — previous homepage and project detail designs, retained for reference

The former prototype URLs in `portfolio/project 3/` redirect to these canonical pages. Make website changes in this folder; do not edit the archived pages as active implementations.


Listener is connected through homepage → Listener project detail → “Listen to the Recordings” → map → listening page. The map links back to the project detail page. All recorded media is inside this folder; no external drive or prototype server is needed. The map basemap requires network access to OpenFreeMap, with place-link fallback when unavailable.

To add a place, reuse the approved Listener Sound Place template and read `projects/listener/AGENTS.md`. Replace its actual media and provenance, recompute its audio-change analysis, and leave description writing to Rex. The previous map implementation is retained in `archive/listener-map-20261024/`.

## Machine live workstation (2026-10-29)

The existing `project-detail.html?project=a-machine-for-misunderstanding` URL now serves `projects/machine/live/index.html` through a query-scoped Vercel rewrite. Other project detail pages keep their existing renderer. The source is Rex’s `project2/new_present_page/dist`; its V1 archive and animation license are retained. Home returns to `index.html#projects-section`; Lab Report remains reachable from the workstation header.

`api/machine.js` forwards only status, interpretation, job polling, and job-filtered SSE to the existing Windows backend. Vercel is required for these live API routes; a basic static preview server supports layout and navigation only. The Windows installation and VDO.Ninja stream must be online for live sound.
