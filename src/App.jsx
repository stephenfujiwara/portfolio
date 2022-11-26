import { Canvas } from "@react-three/fiber";
import {
  Box,
  ScrollControls,
  Scroll,
  OrbitControls,
  Sphere,
} from "@react-three/drei";

import Stars from "./components/Stars";
import CurvedFrames from "./components/Frame";
import Test from "./components/Test";
import AnimatedFrame from "./components/AnimatedFrame";

import "./App.css";

function App() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["black"]} />
        <Stars />
        <ambientLight intensity={0.15} />
        <OrbitControls />
        <AnimatedFrame />
        {/*<ScrollControls pages={10} horizontal={true} infinite={true}>
          <CurvedFrames
            images={["test.png", "test2.png", "test3.png"]}
            radius={9}
          />
  </ScrollControls>*/}
      </Canvas>
    </div>
  );
}

export default App;
