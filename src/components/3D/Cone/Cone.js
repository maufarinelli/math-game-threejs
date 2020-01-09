import * as THREE from "three";

function Cone() {
  const RADIUS = 25;
  const HEIGHT = 50;
  const RADIAL_SEGMENT = 62;

  const coneGeometry = new THREE.ConeGeometry(RADIUS, HEIGHT, RADIAL_SEGMENT)
  const coneMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });

  this.cone = new THREE.Mesh(coneGeometry, coneMaterial);

  // Move the Sphere back in Z so we can see it.
  this.cone.position.x = -130;
  this.cone.position.z = -500;

  return this.cone;
}

export default Cone;