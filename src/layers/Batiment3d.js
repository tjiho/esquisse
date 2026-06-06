import AbstractLayer from "./AbstractLayer.js";

const DEFAULT_TILES = ["https://data.geopf.fr/tms/1.0.0/BDTOPO/{z}/{x}/{y}.pbf"];

export default class Batiment3d extends AbstractLayer {
  constructor({ map, tiles = DEFAULT_TILES, baseStyle } = {}) {
    super({ map, baseStyle });

    this.addSource("bdTopo", {
      type: "vector",
      tiles,
    });

    this.addLayer(
      {
        id: "batiments_ign_hauteur",
        type: "fill-extrusion",
        source: "bdTopo",
        "source-layer": "batiment",
        paint: {
          "fill-extrusion-height": ["get", "hauteur"],
          "fill-extrusion-opacity": 1,
          "fill-extrusion-color": "#F1E8D1",
        },
      },
      "waterway-name",
    );
  }
}
