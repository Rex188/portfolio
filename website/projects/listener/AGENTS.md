# Listener in the portfolio website

This is the canonical website integration of the user-approved Listener Sound Place implementation. `index.html` is the minimal Nanjing map entry for four places; `yihe/`, `deji/`, `jiuhua/`, and `new-city/` contain self-contained listening pages and real media.

- Preserve the minimal presentation, measured acoustic-change seek line, manual time-matched source/VCV crossfade, and Space playback from focused player controls.
- Descriptions are written by Rex. Leave missing text empty and preserve the supplied text and line breaks.
- Respect material-specific differences: Yihe and Deji use time-lapse, Jiuhua uses six manually browsed photographs, New City uses the supplied screen recording and explicitly labels its source audio as screen audio.
- Keep all runtime asset links relative to this deployable website root. Do not link to localhost servers, prototype directories, or the external drive.
- Use each place's README and analysis report for provenance. Regenerate its curve after changing audio; do not interpret acoustic novelty as confirmed new sources.
- Top-left Listener returns to the map; the map returns to the portfolio's Listener detail page. Keep this navigation connected.
- Preview with `python3 serve.py` from the website root to retain HTTP range seeking. Map positions are in `data/places.json` (WGS84). The archived map at `../../archive/listener-map-20261024/` is an implementation reference; do not restore its large titles, layout-adjustment panel or retired locations.
