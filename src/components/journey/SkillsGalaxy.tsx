"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { skillPlanets } from "@/lib/journey/content";

const GROUP_COLOR: Record<string, string> = {
  lang: "#fbbf24",
  cloud: "#f59e0b",
  arch: "#fb923c",
  ai: "#f97316",
  lead: "#fcd34d",
};

type PlanetData = {
  name: string;
  color: string;
  radius: number;
  angle: number;
  speed: number;
  y: number;
  size: number;
};

function Planet({ data }: { data: PlanetData }) {
  const ref = useRef<THREE.Group>(null);
  const angle = useRef(data.angle);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    angle.current += delta * data.speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * data.radius;
      ref.current.position.z = Math.sin(angle.current) * data.radius;
      ref.current.position.y = data.y;
    }
  });

  return (
    <group ref={ref}>
      <mesh
        scale={hovered ? data.size * 1.5 : data.size}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered ? 1.4 : 0.6}
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>
      {hovered && (
        <Html center distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function System() {
  const group = useRef<THREE.Group>(null);

  const planets = useMemo<PlanetData[]>(() => {
    return skillPlanets.map((s, i) => ({
      name: s.name,
      color: GROUP_COLOR[s.group],
      radius: 2.1 + (i % 4) * 0.95 + Math.random() * 0.3,
      angle: (i / skillPlanets.length) * Math.PI * 2,
      speed: 0.12 + Math.random() * 0.16,
      y: (Math.random() - 0.5) * 1.4,
      size: 0.16 + Math.random() * 0.12,
    }));
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={group} rotation={[0.4, 0, 0]}>
      {/* Central sun */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
      </mesh>
      <pointLight intensity={30} color="#fbbf24" distance={30} />
      {planets.map((p) => (
        <Planet key={p.name} data={p} />
      ))}
    </group>
  );
}

export default function SkillsGalaxy() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      camera={{ position: [0, 2.5, 8.5], fov: 55 }}
    >
      <ambientLight intensity={0.4} />
      <System />
    </Canvas>
  );
}
