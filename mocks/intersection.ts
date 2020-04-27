import { Vector3 } from "three";
import { boxAdjacent, boxNotAdjacent, boxHole } from "./boxes";

export const allowedIntersection = {
  distance: 19.333434814471737,
  point: new Vector3(
    -1.5084801013227427,
    0.00009999999873689375,
    -1.3157197724972178
  ),
  object: boxAdjacent,
  uv: {
    x: 0.4915198986772573,
    y: 0.31571977249721783,
  },
  face: {
    a: 10,
    b: 11,
    c: 9,
    normal: {
      x: 0,
      y: 1,
      z: 0,
    },
    vertexNormals: [],
    color: 16777215,
    vertexColors: [],
    materialIndex: 0,
  },
  faceIndex: 5,
};

export const notAllowedIntersection = {
  distance: 17.812777102214728,
  point: new Vector3(
    -4.490376261469228,
    0.00009999999873689375,
    0.03381465029685771
  ),
  object: boxNotAdjacent,
  uv: {
    x: 0.4915198986772573,
    y: 0.31571977249721783,
  },
  face: {
    a: 10,
    b: 11,
    c: 9,
    normal: {
      x: 0,
      y: 1,
      z: 0,
    },
    vertexNormals: [],
    color: 16777215,
    vertexColors: [],
    materialIndex: 0,
  },
  faceIndex: 5,
};

export const intersectionWithHole = {
  distance: 19.333434814471737,
  point: new Vector3(
    -1.5084801013227427,
    0.00009999999873689375,
    -1.3157197724972178
  ),
  object: boxHole,
  uv: {
    x: 0.4915198986772573,
    y: 0.31571977249721783,
  },
  face: {
    a: 10,
    b: 11,
    c: 9,
    normal: {
      x: 0,
      y: 1,
      z: 0,
    },
    vertexNormals: [],
    color: 16777215,
    vertexColors: [],
    materialIndex: 0,
  },
  faceIndex: 5,
};
