# Personal Website Work Log

## Current work context

- **Project:** Rex Li's personal portfolio website.
- **Active design:** the MoMA-inspired personal-site homepage and Project Detail Prototype, now promoted to the canonical website pages.
- **Portfolio folder for this work and its logs:** `/Users/rexli/Documents/Rex/portfolio/website/`.
- **Canonical files:** `index.html`, `project-detail.html`, and `machine-lab-report.html` in this folder.
- `Project 3` is a separate portfolio project. The prototype files formerly stored there are now redirect stubs to the canonical website pages.

## User request

Place the “A Machine for Misunderstanding” lab report directly inside its project detail experience, and bring its presentation in line with the personal website's new visual design.

## Work location correction

On 2026-10-20, work was mistakenly applied to the sibling website implementation while the active design target was the **Project Detail Prototype** for the personal website. The task context was also incorrectly attributed to Project 3 because that was the shell working directory. Future changes must follow the personal website project context above and use the prototype/new homepage design as the reference.

The mistaken edit was initially made to `/Users/rexli/Documents/Rex/portfolio/website/project-detail.html`. It added an embedded Markdown report renderer and report-specific styles. On 2026-10-20, those additions were removed from that file while preserving its pre-existing working-tree changes.

## 2026-10-20 update

- The user clarified the exact active page: `file:///Users/rexli/Documents/Rex/portfolio/project%203/project-detail-prototype.html?project=a-machine-for-misunderstanding`.
- The prototype uses the project summary, thesis, and visitor experience instead of placeholder overview copy.
- The earlier mistaken report additions were removed from `website/project-detail.html`; that file's pre-existing changes were preserved. It is not the target of this task.

## 2026-10-20 layout update

- The user asked to remove the Video section from the A Machine project detail and replace it with a prominent **View Lab Report and Experiment Process** call to action.
- The detail page no longer contains the full report. The call to action opens the standalone, site-styled report page at `/Users/rexli/Documents/Rex/portfolio/project 3/machine-lab-report-prototype.html`.
- This change applies only to A Machine for Misunderstanding; other projects retain their Video sections.
- Follow-up: the call to action now contains only the clickable title line; its arrow, kicker, and supporting sentence were removed at the user's request.
- Follow-up: the user noted that the text looked too much like the page title. It is now a bordered, white button on the lime panel with a hover color change, so the click target reads as an action while keeping the label-only treatment.
- Follow-up: the user asked to reserve the lime color for Robin. A Machine's title panel and report button now use a pale burgundy tint drawn from the site's existing burgundy palette; the standalone report uses the same accent.
- Follow-up: A Machine's Credits section now reads “All created by Rex Li.”
- Follow-up: Listener's project title panel now uses a pale blue-gray accent so it has its own color distinct from Robin and A Machine.

## 2026-10-20 promotion to canonical website

- Promoted the MoMA-inspired homepage, Project Detail Prototype, and standalone lab report into this website folder as `index.html`, `project-detail.html`, and `machine-lab-report.html`.
- Moved the previous homepage, project detail page, and root homepage prototype into `archive/` with `legacy-20261020` filenames.
- Copied the homepage's hero and avatar placeholder assets into `website/assets/` and repaired the promoted pages' internal paths.
- Left redirect stubs at the former prototype URLs so existing links continue to open the canonical pages.
- Updated the homepage project-group labels from year ranges to 2027, 2026, and 2025.
