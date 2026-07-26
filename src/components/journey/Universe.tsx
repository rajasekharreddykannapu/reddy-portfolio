"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/journey/scrollStore";

const AMBER = "#fbbf24";
const ORANGE = "#fb923c";

function Starfield({ count = 2600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute through a deep box so the camera can fly "into" it.
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.02;
      points.current.rotation.x += delta * 0.006;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.055}
        color={AMBER}
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowNode({
  position,
  scale = 1,
  color = AMBER,
  wireframe = true,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  wireframe?: boolean;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.1}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={wireframe ? 1.6 : 0.5}
          wireframe={wireframe}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

function Commit({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
      <mesh position={position} scale={0.22}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.9} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function Rig() {
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const p = scrollState.progress;
    const t = state.clock.elapsedTime;
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;

    const cam = state.camera;
    // Fly forward through the field as the visitor scrolls.
    cam.position.z = 9 - p * 22;
    cam.position.x = Math.sin(t * 0.15) * 1.2 + pointer.current.x * 1.4;
    cam.position.y = Math.cos(t * 0.12) * 0.8 + pointer.current.y * 0.9;
    cam.lookAt(0, 0, cam.position.z - 8);
  });

  return null;
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#05070a", 8, 34]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 4]} intensity={40} color={AMBER} distance={40} />
      <pointLight position={[-8, -3, -6]} intensity={30} color={ORANGE} distance={40} />

      <Starfield />

      <GlowNode position={[-3.4, 1.6, -2]} scale={0.9} />
      <GlowNode position={[3.8, -1.2, -6]} scale={1.3} color={ORANGE} />
      <GlowNode position={[1.6, 2.4, -12]} scale={0.7} />
      <GlowNode position={[-4.2, -2.2, -16]} scale={1.1} />
      <GlowNode position={[2.2, -0.4, -22]} scale={0.8} color={ORANGE} />
      <GlowNode position={[-1.8, 1.2, -28]} scale={1.0} />

      <Commit position={[2.6, 1.4, -3]} />
      <Commit position={[-2.2, -1.6, -9]} />
      <Commit position={[3.2, 0.6, -15]} />
      <Commit position={[-3.0, 1.8, -20]} />

      <Rig />
    </>
  );
}

export default function Universe() {
  return (
    <Canvas
      className="!fixed inset-0 -z-10"
      style={{ position: "fixed" }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 60 }}
    >
      <color attach="background" args={["#05070a"]} />
      <Scene />
    </Canvas>
  );
}
