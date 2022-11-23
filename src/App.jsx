import { Canvas } from "@react-three/fiber";
import { Box, ScrollControls, Scroll, OrbitControls } from "@react-three/drei";

import Stars from "./components/Stars";
import Frame from "./components/Frame";

import "./App.css";

function App() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 0] }}>
        <color attach="background" args={["black"]} />
        <axesHelper args={[5]} />
        <Stars />
        <ambientLight intensity={0.15} />
        <ScrollControls pages={10} horizontal={true} infinite={true}>
          <Frame />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
