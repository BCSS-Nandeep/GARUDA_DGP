import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const COUNT = 220;
const RADIUS = 9;

function ParticleField({ animate }) {
  const groupRef = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!animate || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;
    groupRef.current.rotation.x += delta * 0.005;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#22d3ee"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function DataParticles({ animate = true }) {
  return (
    <>
      <ParticleField animate={animate} />
      <EffectComposer enableNormalPass={false}>
        <Bloom intensity={0.4} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur radius={0.6} />
      </EffectComposer>
    </>
  );
}
