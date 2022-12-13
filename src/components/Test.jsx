import { useCursor, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Test() {
  const [hover, setHover] = useState();
  useCursor(hover);

  const ref = useRef();
  const ripples = useRef();

  const [texture] = useTexture(["brush.png"]);

  const vertexShader = `
  varying vec2 vUv;
  #define PI 3.1415926538
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z = 0.6 * sin(1.0 * position.x + 3.0 * PI / 2.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  

  }  
  `;

  const fragmentShader = `
    void main() {
        gl_FragColor = vec4(0, 0, 0, 0);
    }
  `;

  const meshes = [];
  for (let i = 0; i < 50; i++) {
    meshes.push(
      <mesh raycast={() => null} rotation={[0, 0, Math.random() * 2 * Math.PI]}>
        <planeBufferGeometry args={[0.1, 0.1, 1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthTest={false}
          depthWrite={false}
          opacity={0}
        />
      </mesh>
    );
  }

  let currentWave = 0;

  function setNewWave(position, index) {
    let m = ripples.current.children[index];
    m.material.opacity = 1;
    m.position.set(position.x, position.y, position.z);
  }

  let mouse;

  useFrame((state, delta) => {
    if (hover) {
      mouse = state.raycaster.intersectObject(ref.current)[0].point;
      currentWave = (currentWave + 1) % 50;
      setNewWave(mouse, currentWave);
    }
    ripples.current.children.forEach((mesh) => {
      mesh.rotation.z += 0.02;
      mesh.material.opacity *= 0.98;
      mesh.scale.x = mesh.scale.x * 0.95 + 0.1;
      mesh.scale.y = mesh.scale.z = mesh.scale.x;
    });
  });

  return (
    <group>
      <group ref={ripples}>{meshes}</group>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
        }}
      >
        <planeGeometry args={[4, 2, 16, 16]} />
        <shaderMaterial
          transparent={true}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  );
}
