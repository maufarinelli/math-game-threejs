import * as THREE from "three";

function Sphere () {
  // Set up the sphere vars
  const RADIUS = 50;
  const SEGMENTS = 36;
  const RINGS = 36;

  // create the sphere's material
  const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});

  // Create a new mesh with
  // sphere geometry - we will cover
  // the sphereMaterial next!
  this.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS), 
    sphereMaterial
  );

  // Move the Sphere back in Z so we
  // can see it.
  this.sphere.position.z = -300;

  return this.sphere;
};

export default Sphere;