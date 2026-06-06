// Bicycle.js
import AbstractLineLayer from "./AbstractLineLayer.js";

const DEFAULT_SOURCE_URL = "pmtiles://https://static.ppsfleet.navy/osm-data/velo.pmtiles";
const DEFAULT_BASE_STYLE = "https://static.ppsfleet.navy/osm-data/styles/positron.json";

export default class Bicycle extends AbstractLineLayer {
  constructor({
    map,
    sourceUrl = DEFAULT_SOURCE_URL,
    baseStyle = DEFAULT_BASE_STYLE,
  } = {}) {
    super({
      map,
      source: "velo",
      sourceLayer: "velo",
      sourceConfig: {
        type: "vector",
        url: sourceUrl,
      },
      baseWidth: [
        [5, 1],
        [13, 2],
        [15, 6],
        [17, 8],
        [19, 20],
      ],
      baseStyle,
    });

    this.beforeLayer = "waterway-name";

    this.lines = [
      {
        category: "Partagé avec voitures",
        items: [
          {
            style: "borderLane",
            id: "rue-paisible",
            label: "Rue paisible",
            filter: ["==", "cat", "2.1"],
            color: "#9DAEFF",
          },
          {
            style: "dashedLanePrimary",
            id: "partage-voiture",
            label: "Voie partagée voiture",
            filter: ["==", "cat", "4"],
            color: "#1E88E5",
          },
        ],
      },
      {
        category: "Partagé avec piétons",
        items: [
          {
            style: "borderLane",
            id: "partage-pieton-tertiary",
            label: "Voie piétonne sans indication",
            filter: ["==", "cat", "3.3"],
            color: "#B382BB",
          },
          {
            style: "dashedLaneSecondary",
            id: "partage-pieton-secondary",
            label: "Voie partagée piéton",
            filter: ["==", "cat", "3.2"],
            color: "#AB47BC",
          },
          {
            style: "dashedLanePrimary",
            id: "partage-pieton-main",
            label: "Voie mixte aménagée",
            filter: ["==", "cat", "3.1"],
            color: "#AB47BC",
          },
        ],
      },
      {
        category: "Pur vélo",
        items: [
          {
            style: "dashedLanePrimary",
            id: "bande",
            label: "Bande cyclable",
            filter: ["==", "cat", "1.2"],
            color: "#4ECA00",
          },
          {
            style: "solidLanePrimary",
            id: "piste",
            label: "Piste cyclable",
            filter: ["==", "cat", "1.1"],
            color: "#4ECA00",
          },
        ],
      },
    ];

    this.buildLayers();
  }
}
