import { useRef } from "react";
import { useScroll, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Frame() {
  const data = useScroll();
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += Math.max(0, data.delta * 50);
  });
  return (
    <group ref={ref}>
      <Box args={[2, 4, 1]} position={[0, 0, -10]}>
        <meshNormalMaterial />
      </Box>
      <Box args={[2, 4, 1]} position={[10, 0, 0]}>
        <meshNormalMaterial />
      </Box>
    </group>
  );
}
