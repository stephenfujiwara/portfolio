import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { useState } from "react";

import Stars from "./components/Stars";
import CurvedFrames from "./components/Frame";
import Description from "./components/Description";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import { projects } from "./projects";

import "./App.css";

function App() {
  const [desc, setDesc] = useState();
  return (
    <div className="h-screen">
      {desc?.title && <Description {...desc} />}
      <Welcome />
      <Footer />
      <Canvas camera={{ position: [0, 0, 0] }}>
        <color attach="background" args={["black"]} />
        <Stars />
        <ambientLight intensity={0.5} />
        <ScrollControls pages={10} horizontal={true} infinite={true}>
          <CurvedFrames projects={projects} radius={5} setDesc={setDesc} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
