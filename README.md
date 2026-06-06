# esquisse

Reusable cartographic layers built on top of MapLibre GL. Designed to be consumed both by a Preact frontend
(`simplestreetmap`) and by a Vue/Nuxt frontend (`ptitlutins`).

## API

### `createMap(options) → OsmMap`

Creates and returns an instance that **extends `maplibre.Map`**. The full
MapLibre API is therefore available.

```js
import { createMap } from "esquisse";

const map = createMap({
  maplibre: window.maplibregl,   // required
  pmtiles: window.pmtiles,       // optional
  container: "map",              // required (id or element)
  baseStyle: BASE_STYLE_URL,     // required
  center: [lng, lat],
  zoom: 13,
  syncUrl: true,                 // optional: sync ?map= in the URL
  globe: true,                   // optional: globe projection on load
});
```

Methods added on the instance:

- `onLoadOrNow(fn)` — runs `fn()` now if the map is loaded, otherwise on the
  next `load`.
- `changeBaseMap(url)` — swaps the base style while preserving custom sources
  and layers (those whose id starts with `custom-`).

### `LayerSelection`

Holds a set of layers and the active one.

```js
import { LayerSelection } from "esquisse";

const selection = new LayerSelection({ map, baseStyle });
selection.setActive("bicycle");
selection.subscribe((activeKey) => { /* ... */ });

selection.current.show();
selection.current.legend(); // { groups: [...] } or undefined
```

Available keys: `plan`, `satellite`, `batiment3d`, `bicycle`.

### Layers

Each layer takes `{ map, ... }`. Tile URLs are injectable (`sourceUrl` or
`tiles`) with a sensible default.

```js
import { Poi, Bicycle, Terrain, Satellite, Batiment3d, Plan } from "esquisse";

const poi = new Poi({ map });
const bike = new Bicycle({ map });

poi.show();
poi.onClick((feature, lngLat) => {
  if (!feature) { /* click outside any POI */ return; }
  /* ... */
});
```

#### Shared methods (`AbstractLayer`)

- `show()` / `hide()`
- `onClick(callback)` — attaches a click + pointer-cursor handler scoped to the
  layer; calls `callback(feature, lngLat)`, or `callback(null, lngLat)` if
  nothing was hit. Returns `this`.
- `legend()` — returns `{ groups: [{ category, items: [...] }] }` for line
  layers (e.g. bicycle), otherwise undefined.

#### Extending a layer

```js
import { AbstractLayer, AbstractLineLayer } from "esquisse";

class MyLine extends AbstractLineLayer { /* ... */ }
class MyRaster extends AbstractLayer { /* ... */ }
```

## The host owns rendering

esquisse does not know how to display a panel, a legend or a popup. The host
listens for events / reads the data and renders it in its own framework:

```js
// simplestreetmap side (Preact)
poi.onClick((feature) => {
  if (!feature) { panel.close(); return; }
  const el = document.createElement("div");
  render(html`<${PoiViewer} feature=${feature} />`, el);
  panel.open(el);
});

// ptitlutins side (Vue)
poi.onClick((feature) => { selectedFeature.value = feature; });
```
