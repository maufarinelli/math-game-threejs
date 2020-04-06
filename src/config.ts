const headerHeight = 115;

export default {
  SCENE_CONFIG: {
    // Set the scene size.
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight - headerHeight,

    // Set some camera attributes.
    VIEW_ANGLE: 35,
    get ASPECT() {
      return this.WIDTH / this.HEIGHT;
    },
    NEAR: 1,
    FAR: 1000,

    COLOR: "rgb(140, 220, 250)",
  },

  CAMERA_CONFIG: {
    x: -6.7,
    y: 13,
    z: 12,
  },

  // Set some point lights
  POINT_LIGHT: {
    color: "0xFFFFFF",
    x: 280,
    y: 200,
    z: 30,
  },

  PLANE_CONFIG: {
    WIDTH: 60,
    HEIGHT: 60,
    COLOR: "rgb(126, 200, 80)",
  },

  DIRECTIONAL_LIGHT: {
    COLOR: "0xFFFFFF",
    INTENSITY: 1.5,
  },

  BOX_CONFIG: {
    WIDTH: 1,
    HEIGHT: 0.0001,
    DEPTH: 1,
    COLOR: 0x6aa843,
    LIGHTER_COLOR: "0xA5CA8E",
    HOLE_COLOR: "0x000000",
    HOLE_TEXT_COLOR: "0xFFFFFF",
    SEPARATOR: 1.5,
  },

  TEXT_CONFIG: {
    SIZE: 0.3,
    HEIGHT: 0.05,
    COLOR: "rgb(106, 168, 67)",
  },
};
