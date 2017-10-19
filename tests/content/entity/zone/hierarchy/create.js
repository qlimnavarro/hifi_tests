// Enabled draw zone bounding box and stack to visualize the stack of zone components
//Render.getConfig("RenderMainView.DrawZoneStack").enabled = true
//Render.getConfig("RenderMainView.DrawZones").enabled = true

// Create "terrain"
var terrainProperties = {
  type: "Box",
  name: "terrain",
  position: { x: 0.0, y: -1.0, z: 0.0},
  dimensions: { x: 1000.0, y: 1.00, z: 1000.0},
  "color": {"red":100,"green":100,"blue":100},
  visible: true
};
var terrain = Entities.addEntity(terrainProperties);

var zone1Position = { x: 0.0, y: 0.01, z: 0.0};
var zone2Position = { x: 0.0, y: 0.02, z: 8.0};
var zone3Position = { x: 0.0, y: 0.03, z: 0.0};
var zone4Position = { x: 0.0, y: 0.04, z: 0.0};

var zone1Dimensions = { x: 20.0, y: 0.01, z: 40.0};
var zone2Dimensions = { x: 30.0, y: 0.01, z: 20.0};
var zone3Dimensions = { x: 10.0, y: 0.01, z: 30.0};
var zone4Dimensions = { x: 6.0, y: 0.01, z: 20.0};

// Create zones
var zone1properties = {
  type: "Zone",
  name: "zone 1",
  position: zone1Position,
  dimensions: zone1Dimensions,
  keyLight:{"color": {"red":200,"green":0,"blue":0}},
  backgroundMode:"skybox",
  skybox:{"color":{"red":200,"green":0,"blue":0}}
};
var zone1 = Entities.addEntity(zone1properties);

var zone2properties = {
  type: "Zone",
  name: "zone 2",
  position: zone2Position,
  dimensions: zone2Dimensions,
  keyLight:{"color": {"red":150,"green":150,"blue":0}},
  backgroundMode:"skybox",
  skybox:{"color":{"red":150,"green":150,"blue":0}}
};
var zone2 = Entities.addEntity(zone2properties);

var zone3properties = {
  type: "Zone",
  name: "zone 3",
  position: zone3Position,
  dimensions: zone3Dimensions,
  keyLight:{"color": {"red":0,"green":200,"blue":0}},
  backgroundMode:"skybox",
  skybox:{"color":{"red":0,"green":200,"blue":0}}
};
var zone3 = Entities.addEntity(zone3properties);

var zone4properties = {
  type: "Zone",
  name: "zone 4",
  position: zone4Position,
  dimensions: zone4Dimensions,
  keyLight:{"color": {"red":0,"green":0,"blue":200}},
  backgroundMode:"skybox",
  skybox:{"color":{"red":0,"green":0,"blue":200}}
};
var zone4 = Entities.addEntity(zone4properties);

// Show zone positions on the ground
var marker1properties = {
  type: "Box",
  name: "marker 1",
  position: zone1Position,
  dimensions: zone1Dimensions,
  "color": {"red":200,"green":0,"blue":0},
  visible: true
};
var marker1 = Entities.addEntity(marker1properties);

var marker2properties = {
  type: "Box",
  name: "marker 2",
  position: zone2Position,
  dimensions: zone2Dimensions,
  "color": {"red":150,"green":150,"blue":0},
  visible: true
};
var marker2 = Entities.addEntity(marker2properties);

var marker3properties = {
  type: "Box",
  name: "marker 3",
  position: zone3Position,
  dimensions: zone3Dimensions,
  "color": {"red":0,"green":200,"blue":0},
  visible: true
};
var marker3 = Entities.addEntity(marker3properties);

var marker4properties = {
  type: "Box",
  name: "marker 4",
  position: zone4Position,
  dimensions: zone4Dimensions,
  "color": {"red":0,"green":0,"blue":200},
  visible: true
};
var marker4 = Entities.addEntity(marker4properties);

// Position avatar
//MyAvatar.position  = {x: 0.0, y: 0.0, z: -20.0};
//MyAvatar.orientation = {x: 0.0, y: 1.0, z: 0.0, w: 0.0};

true;