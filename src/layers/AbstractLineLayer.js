// AbstractLineLayer.js
import AbstractLayer from "./AbstractLayer.js";
import {
  buildBorderLayer,
  buildFillLayer,
  buildDashedCenterLayer,
} from "../tools/layers.js";

export default class AbstractLineLayer extends AbstractLayer {
  constructor({
    map,
    source,
    sourceLayer,
    sourceConfig,
    baseWidth,
    baseStyle,
  }) {
    super({ map, baseStyle });
    this._source = source;
    this._sourceLayer = sourceLayer;
    this._baseWidth = baseWidth;
    this.lines = [];

    if (sourceConfig) {
      this.addSource(source, sourceConfig);
    }
  }

  get _defaultLayerProperties() {
    return {
      source: this._source,
      sourceLayer: this._sourceLayer,
      width: this._baseWidth,
    };
  }

  border(options) {
    return buildBorderLayer({ ...this._defaultLayerProperties, ...options });
  }

  fill(options) {
    return buildFillLayer({ ...this._defaultLayerProperties, ...options });
  }

  dashedCenter(options) {
    return buildDashedCenterLayer({
      ...this._defaultLayerProperties,
      ...options,
    });
  }

  solidLanePrimary({ id, filter, color, outlineColor = "#FFFFFF" }) {
    return [
      this.border({ id, filter, color: outlineColor, borderWidth: 1 }),
      this.fill({ id, filter, color }),
    ];
  }

  dashedLanePrimary({
    id,
    filter,
    color,
    innerColor = "#FFFFFF",
    detailZoom = 13,
    dashArray = [3, 3],
    overviewDashArray = [1, 2],
  }) {
    return [
      this.border({ id, filter, color, minzoom: detailZoom, borderWidth: 2 }),
      this.fill({ id, filter, color: innerColor, minzoom: detailZoom }),
      this.dashedCenter({ id, filter, color, dashArray, minzoom: detailZoom }),
      this.fill({
        id: id + "-overview",
        filter,
        color,
        maxzoom: detailZoom,
      }),
    ];
  }

  dashedLaneSecondary({
    id,
    filter,
    color,
    innerColor = "#FFFFFF",
    detailZoom = 13,
    dashArray = [3, 3],
    overviewDashArray = [1, 2],
  }) {
    return [
      this.border({ id, filter, color, minzoom: detailZoom, borderWidth: 1 }),
      this.fill({ id, filter, color: innerColor, minzoom: detailZoom }),
      this.dashedCenter({ id, filter, color, dashArray, minzoom: detailZoom }),
      this.fill({
        id: id + "-overview",
        filter,
        color: "#FFF",
        maxzoom: detailZoom,
      }),
      this.dashedCenter({ id, filter, color, dashArray, minzoom: detailZoom }),
    ];
  }

  dashedLaneWithoutborder({
    id,
    filter,
    color,
    innerColor = "#FFFFFF",
    detailZoom = 13,
    dashArray = [3, 3],
    overviewDashArray = [1, 2],
  }) {
    return [
      this.fill({ id, filter, color: innerColor }),
      this.dashedCenter({ id, filter, color, dashArray, minzoom: detailZoom }),
      this.dashedCenter({
        id: id + "-overview",
        filter,
        color,
        dashWidth: this._baseWidth,
        dashArray: overviewDashArray,
        maxzoom: detailZoom,
      }),
    ];
  }

  borderLane({ id, filter, color, innerColor = "#FFFFFF", detailZoom = 13 }) {
    return [
      this.border({ id, filter, color, minzoom: detailZoom, borderWidth: 1 }),
      this.fill({ id, filter, color: innerColor }),
    ];
  }

  addLayers(layers) {
    for (const layer of layers) {
      this.addLayer(layer);
    }
  }

  _buildItemLayers(item) {
    switch (item.style) {
      case "solidLanePrimary":
        return this.solidLanePrimary(item);
      case "dashedLanePrimary":
        return this.dashedLanePrimary(item);
      case "dashedLaneSecondary":
        return this.dashedLaneSecondary(item);
      case "borderLane":
        return this.borderLane(item);
      default:
        throw new Error(`Unknown line style: ${item.style}`);
    }
  }

  buildLayers() {
    for (const group of this.lines) {
      for (const item of group.items) {
        this.addLayers(this._buildItemLayers(item));
      }
    }
  }

  legend() {
    return { groups: this.lines };
  }
}
