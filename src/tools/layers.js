// tools/layers.js

/**
 * @typedef {Array<[number, number]>} ZoomWidthStops
 * Liste de paires [zoom, width] : à chaque niveau de zoom, la largeur en pixels.
 * Exemple : [[5, 1], [13, 2], [15, 6], [17, 8], [19, 20]]
 */

/**
 * Convertit une liste de stops en expression d'interpolation linéaire MapLibre,
 * utilisable comme valeur de propriété paint (line-width, line-gap-width, etc.).
 * @param {ZoomWidthStops} stops
 * @returns {Array}
 */
export function stopsToZoomInterpolation(stops) {
  return ["interpolate", ["linear"], ["zoom"], ...stops.flat()];
}

/**
 * @param {ZoomWidthStops} stops
 * @param {number} value
 * @returns {ZoomWidthStops}
 */
export function addToStopWidths(stops, value) {
  return stops.map(function ([zoom, width]) {
    return [zoom, width + value];
  });
}

/**
 * @param {ZoomWidthStops} stops
 * @param {number} value
 * @returns {ZoomWidthStops}
 */
export function subtractFromStopWidths(stops, value) {
  return stops.map(function ([zoom, width]) {
    return [zoom, Math.max(0, width - value)];
  });
}

/**
 * @param {ZoomWidthStops} stops
 * @param {number} factor
 * @returns {ZoomWidthStops}
 */
export function multiplyStopWidths(stops, factor) {
  return stops.map(function ([zoom, width]) {
    return [zoom, width * factor];
  });
}

export function buildBorderLayer({
  id,
  color,
  borderWidth = 2,
  width,
  source,
  sourceLayer,
  filter,
  minzoom,
  maxzoom,
}) {
  const borderLayerId = id + "-border";
  const widthExpression = stopsToZoomInterpolation(width);

  const layer = {
    id: borderLayerId,
    type: "line",
    source,
    "source-layer": sourceLayer,
    filter,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": color,
      "line-width": borderWidth,
      "line-gap-width": widthExpression,
    },
  };

  if (minzoom !== undefined) layer.minzoom = minzoom;
  if (maxzoom !== undefined) layer.maxzoom = maxzoom;

  return layer;
}

export function buildFillLayer({
  id,
  color,
  width,
  source,
  sourceLayer,
  filter,
  minzoom,
  maxzoom,
}) {
  const widthExpression = stopsToZoomInterpolation(width);

  const layer = {
    id,
    type: "line",
    source,
    "source-layer": sourceLayer,
    filter,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": color,
      "line-width": widthExpression,
    },
  };

  if (minzoom !== undefined) layer.minzoom = minzoom;
  if (maxzoom !== undefined) layer.maxzoom = maxzoom;

  return layer;
}

// tools/layers.js
export function buildDashedCenterLayer({
  id,
  color,
  dashWidth = 1,
  dashArray = [2, 2],
  source,
  sourceLayer,
  filter,
  minzoom,
  maxzoom,
}) {
  const dashedLayerId = id + "-dash";
  const widthValue = Array.isArray(dashWidth)
    ? stopsToZoomInterpolation(dashWidth)
    : dashWidth;

  const layer = {
    id: dashedLayerId,
    type: "line",
    source,
    "source-layer": sourceLayer,
    filter,
    layout: { "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": color,
      "line-width": widthValue,
      "line-dasharray": dashArray,
    },
  };

  if (minzoom !== undefined) layer.minzoom = minzoom;
  if (maxzoom !== undefined) layer.maxzoom = maxzoom;

  return layer;
}
