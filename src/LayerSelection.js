import Plan from "./layers/Plan.js";
import Satellite from "./layers/Satellite.js";
import Batiment3d from "./layers/Batiment3d.js";
import Bicycle from "./layers/Bicycle.js";

export class LayerSelection {
  constructor({ map, baseStyle }) {
    this.layers = {
      plan: { layer: new Plan({ map, baseStyle }), name: "Plan" },
      satellite: { layer: new Satellite({ map, baseStyle }), name: "Satellite" },
      batiment3d: { layer: new Batiment3d({ map, baseStyle }), name: "Batiment 3d" },
      bicycle: { layer: new Bicycle({ map }), name: "Vélo (alpha)" },
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
