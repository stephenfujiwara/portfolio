import { Canvas } from "@react-three/fiber";
import {
  Box,
  ScrollControls,
  Scroll,
  OrbitControls,
  Sphere,
  FirstPersonControls,
  Text,
  Text3D,
  Center,
  GradientTexture,
} from "@react-three/drei";

import Stars from "./components/Stars";
import CurvedFrames from "./components/Frame";
import Test from "./components/Test";
import AnimatedFrame from "./components/AnimatedFrame";

import "./App.css";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 0] }}>
        <color attach="background" args={["black"]} />
        {/*<Welcome />*/}
        <Stars />
        <ambientLight intensity={0.5} />
        <ScrollControls pages={10} horizontal={true} infinite={true}>
          <CurvedFrames
            images={["test.png", "test2.png", "test3.png"]}
            radius={5}
          />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
