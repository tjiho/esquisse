import AbstractLayer from "./AbstractLayer.js";

const DEFAULT_SOURCE_URL = "pmtiles://https://static.ppsfleet.navy/osm-data/france-elevation.pmtiles";

export default class Terrain extends AbstractLayer {
  constructor({ map, sourceUrl = DEFAULT_SOURCE_URL, baseStyle } = {}) {
    super({ map, visibleOnLoad: true, baseStyle });

    this.addSource("terrain", {
      type: "raster-dem",
      url: sourceUrl,
      encoding: "terrarium",
    });

    this.map.onLoadOrNow(() => {
      this.map.setTerrain({ source: "terrain", exaggeration: 1.2 });
      this.map.setSky({
        "sky-color": "#cfe8ff",
        "horizon-color": "#ffffff",
        "fog-color": "#ffffff",
        "fog-ground-blend": 0.5,
      });
    });

    this.addLayer(
      {
        id: "hillshade",
        type: "hillshade",
        source: "terrain",
        paint: { "hillshade-exaggeration": 0.35 },
      },
      "road_area_pier",
    );
  }
}
