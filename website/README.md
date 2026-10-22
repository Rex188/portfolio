# Rex Li — Portfolio Website

This folder is the canonical, deployable website root. The current homepage and project detail use the MoMA-inspired personal-site prototype design. Serve this directory over HTTP (the Listener page loads its place records from JSON and uses JavaScript modules).

## Local preview

From this directory run `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Structure

- `index.html` — canonical portfolio homepage
- `project-detail.html` — canonical project detail pages
- `machine-lab-report.html` — A Machine for Misunderstanding lab report and experiment process
- `data/projects.json` — project metadata for future data-driven page rendering
- `assets/covers/` — homepage and project cover images
- `assets/docs/` — documents linked from project pages
- `projects/listener/` — Listener sound map, split into HTML, CSS, JS modules, and `data/places.json`
- `archive/` — previous homepage and project detail designs, retained for reference

The former prototype URLs in `portfolio/project 3/` redirect to these canonical pages. Make website changes in this folder; do not edit the archived pages as active implementations.


To add a Listener stop, edit `projects/listener/data/places.json`; each item defines bilingual name, area, story, and latitude/longitude.
