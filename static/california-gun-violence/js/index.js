const deckgl = new deck.DeckGL({
  mapboxApiAccessToken: 'pk.eyJ1IjoibTAwbmxpZ2h0IiwiYSI6ImNqcTB2bXF0dTA3a3Y0MnA3MDR0bG45NjEifQ.ERXfu3Z3IFfc7c-2Sn8MWg',
  mapStyle: 'mapbox://styles/mapbox/dark-v9',
  longitude: -118.333,
  latitude: 33.909,
  zoom: 7,
  minZoom: 4,
  maxZoom: 15,
  pitch: 40.5
});

let data = null;

const OPTIONS = ['radius', 'coverage', 'upperPercentile'];

const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const LIGHT_SETTINGS = {
  lightsPosition: [-122.4194, 37.7749, 8000, -118.2437, 34.0522, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

OPTIONS.forEach(key => {
  document.getElementById(key).oninput = renderLayer;
});

function renderLayer () {
  const options = {};
  OPTIONS.forEach(key => {
    const value = document.getElementById(key).value;
    document.getElementById(key + '-value').innerHTML = value;
    options[key] = value;
  });

  const hexagonLayer = new deck.HexagonLayer({
    id: 'heatmap',
    colorRange: COLOR_RANGE,
    data,
    elevationRange: [0, 1000],
    elevationScale: 250,
    extruded: true,
    getPosition: d => d,
    lightSettings: LIGHT_SETTINGS,
    opacity: 0.1,
    ...options
  });

  deckgl.setProps({
    layers: [hexagonLayer]
  });
}

d3.csv('https://raw.githubusercontent.com/m00nlight/some-dataset/master/california-gun-violence-geo.csv',
   (error, response) => {
  data = response.map(d => [Number(d.lng), Number(d.lat)]);
  renderLayer();
});