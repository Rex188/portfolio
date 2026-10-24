# Listener — portfolio integration

The approved four-mapening experience is part of the main portfolio. Open the homepage, select Listener, then “Listen to the Recordings”.

- `index.html`: minimal Nanjing map, with a return link to `../../project-detail.html?project=listener`.
- `yihe/`: Yihe Road, field time-lapse.
- `deji/`: Deji Plaza, field time-lapse.
- `jiuhua/`: Jiuhua Hill, six manually browsed photographs.
- `new-city/`: New City Plaza, screen recording and explicitly identified screen audio.

All page assets are local relative files, copied from the approved prototypes. Descriptions remain empty until Rex provides the text. Place-specific README files retain the actual material provenance and analysis notes.

Run `python3 serve.py` from the website root and open `http://127.0.0.1:8770/`. The preview server supports byte ranges for seeking. No running prototype server or external media drive is required.

The original prototype implementations remain in `portfolio/project 3/`. The superseded map is preserved at `website/archive/listener-map-20261024/`.

## Map coordinates

`data/places.json` is the current source of four WGS84 positions and page links. Yihe Road uses the supplied time-lapse GPS (32.0637, 118.7595). Jiuhua Hill uses the park entrance photograph IMG_1373 GPS (32.06155, 118.8016667). Deji and New City retain the project's earlier map pins; they are place-level markers, not independently verified recording GPS positions. No Amap GCJ-02 coordinates were mixed into this WGS84 map.

MapLibre GL JS 5.6.1 and its CSS/license are retained in `vendor/`; the official OpenFreeMap Dark style is retained in `data/map-style.json`. The geographic basemap still needs network access to OpenFreeMap tiles/fonts. When it cannot load, the four place links remain available. Locations' own media stays local.

To move a pin, edit only its `coordinates` in `data/places.json`; use actual WGS84 longitude/latitude, not screen pixels or unconverted provider coordinates. Markers must retain absolute positioning so DOM flow cannot offset them from their geographic locations.
