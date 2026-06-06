export default class AbstractLayer {
  constructor({ map, visibleOnLoad = false, baseStyle = null } = {}) {
    if (!map) throw new Error("AbstractLayer: `map` is required");
    this.map = map;
    this.layersIds = [];
    this.sourcesIds = [];
    this.beforeLayer = null;
    this.visibleOnLoad = visibleOnLoad;
    this.baseStyle = baseStyle;
  }

  addSource(id, source) {
    id = "custom-" + id;
    if (this.sourcesIds.includes(id)) {
      console.warn(`Source "${id}" already exists. Skipping.`);
      return;
    }
    this.sourcesIds.push(id);

    this.map.onLoadOrNow(() => {
      if (!this.map.getSource(id)) {
        this.map.addSource(id, source);
      }
    });
  }

  addLayer(layer, before = null) {
    layer.id = "custom-" + layer.id;
    layer.source = "custom-" + layer.source;
    if (this.layersIds.includes(layer.id)) {
      console.warn(`Layer "${layer.id}" already exists. Skipping.`);
      return;
    }
    this.layersIds.push(layer.id);

    this.map.onLoadOrNow(() => {
      if (!this.map.getLayer(layer.id)) {
        if (!this.visibleOnLoad) {
          layer.layout = {
            visibility: "none",
          };
        }
        this.map.addLayer(layer, this.beforeLayer || before);
      }
    });
  }

  async show() {
    if (this.baseStyle) await this.map.changeBaseMap(this.baseStyle);
    this.layersIds.forEach((id) => {
      if (this.map.getLayer(id)) {
        this.map.setLayoutProperty(id, "visibility", "visible");
      }
    });
  }

  async hide() {
    this.layersIds.forEach((id) => {
      if (this.map.getLayer(id)) {
        this.map.setLayoutProperty(id, "visibility", "none");
      }
    });
  }

  onClick(callback) {
    this.map.onLoadOrNow(() => {
      this.map.on("click", (e) => {
        const bbox = [
          [e.point.x - 5, e.point.y - 5],
          [e.point.x + 5, e.point.y + 5],
        ];
        const features = this.map.queryRenderedFeatures(bbox, {
          layers: this.layersIds,
        });

        if (!features.length) {
          callback(null, e.lngLat);
          return;
        }

        callback(features[0], e.lngLat);
      });

      this.map.on("mousemove", (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: this.layersIds,
        });
        this.map.getCanvas().style.cursor = features.length ? "pointer" : "";
      });
    });

    return this;
  }
}
