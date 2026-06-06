import AbstractLayer from "./AbstractLayer.js";

const DEFAULT_TILES = [
  "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0" +
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg" +
    "&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
];

export default class Satellite extends AbstractLayer {
  constructor({ map, tiles = DEFAULT_TILES, baseStyle } = {}) {
    super({ map, baseStyle });

    this.addSource("satellite", {
      type: "raster",
      tiles,
      tileSize: 256,
      attribution: "© IGN-Géoportail",
    });

    this.addLayer(
      {
        id: "satellite",
        type: "raster",
        source: "satellite",
      },
      "waterway-name",
    );
  }
}
