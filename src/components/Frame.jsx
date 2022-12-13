import { useCursor, useScroll, useTexture, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, Vector3 } from "three";
import { useRef, useState } from "react";

export default function CurvedFrames({ projects, radius, setDesc }) {
  const data = useScroll();
  const ref = useRef();
  const center = new Vector3(0, 0, 0);

  useFrame((state, delta) => {
    ref.current.rotation.y = data.offset * 10 * (2 * Math.PI);
    ref.current.children.map((child) => {
      child.lookAt(center);
    });
  });

  const active = useRef();

  const frames = [];
  for (let i = 0; i < projects.length; i++) {
    const ratio = i / projects.length;
    frames.push(
      <CurvedFrame
        key={i}
        image={projects[i].image}
        position={[
          radius * Math.sin(ratio * Math.PI),
          0,
          -radius * Math.cos(ratio * Math.PI),
        ]}
        rotation={[0, ratio * (2 * Math.PI), 0]}
        handleClick={() => {
          if (active.current === projects[i]) {
            active.current = "";
            setDesc("");
          } else {
            active.current = projects[i];
            setDesc(projects[i]);
          }
          //console.log(active.current);
        }}
      />
    );
  }

  return (
    <Float floatingRange={[-0.01, 0.01]} floatIntensity={3}>
      <group
        ref={ref}
        onPointerMissed={() => {
          setDesc("");
          //console.log(active.current);
        }}
      >
        {frames}
      </group>
    </Float>
  );
}

function CurvedFrame({ image, handleClick, handleMiss, ...props }) {
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
  const [texture] = useTexture([image]);
  const [hover, setHover] = useState(null);
  useCursor(hover);

  const [desc, setDesc] = useState(false);

  useFrame((state, delta) => {});
  return (
    <mesh
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => handleClick()}
    >
      <planeGeometry args={[4, 2, 16, 16]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{ uTexture: { value: texture } }}
        side={DoubleSide}
      />
    </mesh>
  );
}
