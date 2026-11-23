import Plan from "./layers/Plan.js";

// `layers` : { key: { layer, name } }, ajoutés après la couche "plan" par défaut.
export class LayerSelection {
  constructor({ map, baseStyle, layers = {} }) {
    this.layers = {
      plan: { layer: new Plan({ map, baseStyle }), name: "Plan" },
      ...layers,
    };
    this.active = "plan";
    this._listeners = new Set();
  }

  get current() {
    return this.layers[this.active]?.layer;
  }

  setActive(key) {
    if (key === this.active) return;
    this.active = key;
    this._listeners.forEach((fn) => fn(this.active));
  }

  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }
}
