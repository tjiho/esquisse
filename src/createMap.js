const PMTILES_PROTOCOL_KEY = "__plan_pmtiles_protocol_registered__";

function buildOsmMapClass(maplibre) {
  return class OsmMap extends maplibre.Map {
    constructor({
      container,
      baseStyle,
      center,
      zoom,
      syncUrl = false,
      globe = false,
    }) {
      super({
        container,
        style: baseStyle,
        center,
        zoom,
      });
      this.currentStyleUrl = baseStyle;
      this._syncUrl = syncUrl;
      this._globe = globe;

      const nav = new maplibre.NavigationControl();
      const gps = new maplibre.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      });
      const scale = new maplibre.ScaleControl({
        maxWidth: 80,
        unit: "metric",
      });

      this.addControl(nav, "bottom-right");
      this.addControl(gps, "bottom-right");
      this.addControl(scale);

      if (syncUrl) {
        this.on("moveend", () => {
          const { lng, lat } = this.getCenter();
          const z = this.getZoom();
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("map", `${z}/${lat}/${lng}`);
          history.replaceState(
            null,
            null,
            `${document.location.pathname}?${searchParams}`,
          );
        });
      }

      if (globe) {
        this.on("load", () => {
          this.setProjection({ type: "globe" });
          const el = this.getContainer();
          if (el) el.style.backgroundColor = "#000";
        });
      }
    }

    onLoadOrNow(fn) {
      if (this.loaded()) {
        fn();
      } else {
        this.on("load", fn);
      }
    }

    changeBaseMap(url) {
      return new Promise((resolve) => {
        if (this.currentStyleUrl === url) {
          resolve();
          return;
        }

        const isCustom = (id) => id.startsWith("custom-");

        this.setStyle(url, {
          diff: false,
          transformStyle: (prev, next) => {
            if (!prev) return next;

            const customSources = Object.fromEntries(
              Object.entries(prev.sources).filter(([id]) => isCustom(id)),
            );

            const layers = [...next.layers];
            const nextIds = new Set(next.layers.map((l) => l.id));

            for (let i = 0; i < prev.layers.length; i++) {
              const layer = prev.layers[i];
              if (!isCustom(layer.id)) continue;

              let beforeId = null;
              for (let j = i + 1; j < prev.layers.length; j++) {
                if (
                  !isCustom(prev.layers[j].id) &&
                  nextIds.has(prev.layers[j].id)
                ) {
                  beforeId = prev.layers[j].id;
                  break;
                }
              }

              const idx = beforeId
                ? layers.findIndex((l) => l.id === beforeId)
                : layers.length;
              layers.splice(idx, 0, layer);
            }

            return {
              ...next,
              sources: { ...next.sources, ...customSources },
              layers,
            };
          },
        });

        this.currentStyleUrl = url;
        this.once("style.load", resolve);
      });
    }
  };
}

export function createMap(options) {
  const { maplibre, pmtiles } = options;
  if (!maplibre) throw new Error("createMap: `maplibre` is required");
  if (!options.container) throw new Error("createMap: `container` is required");
  if (!options.baseStyle) throw new Error("createMap: `baseStyle` is required");

  if (pmtiles && !maplibre[PMTILES_PROTOCOL_KEY]) {
    const protocol = new pmtiles.Protocol({ metadata: true });
    maplibre.addProtocol("pmtiles", protocol.tile);
    maplibre[PMTILES_PROTOCOL_KEY] = true;
  }

  const OsmMap = buildOsmMapClass(maplibre);
  return new OsmMap(options);
}
