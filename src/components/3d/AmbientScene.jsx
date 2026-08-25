import { Canvas } from "@react-three/fiber";
import { DataParticles } from "./DataParticles";

export default function AmbientScene({ animate }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <DataParticles animate={animate} />
    </Canvas>
  );
}
