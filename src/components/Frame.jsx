import { useRef } from "react";
import { useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { DoubleSide } from "three";

export default function Frames() {
  const data = useScroll();
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += Math.max(0, data.delta * 50);
  });
  return (
    <group ref={ref}>
      <CurvedFrame />
    </group>
  );
}

function CurvedFrame() {
  const vertexShader = `
  #define PI 3.1415926538
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z = 0.6 * sin(1.0 * position.x + 3.0 * PI / 2.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
  } 
  `;
  const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    vec3 texture = texture2D(uTexture, vUv).rgb;
    gl_FragColor = vec4(texture, 1.0);
  } 
  `;
  const [test] = useTexture(["test.png"]);
  return (
    <mesh>
      <planeGeometry args={[4, 2, 16, 16]} position={[0, 0, 0]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{ uTexture: { value: test } }}
        side={DoubleSide}
      />
    </mesh>
  );
}
