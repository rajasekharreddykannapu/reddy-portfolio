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

type NodeData = {
  name: string;
  color: string;
  pos: THREE.Vector3;
  size: number;
};

// Deterministic pseudo-spherical layout (Fibonacci sphere) so positions are
// stable across renders and edges stay accurate.
function useGraph() {
  return useMemo(() => {
    const n = skillPlanets.length;
    const R = 3.4;
    const nodes: NodeData[] = skillPlanets.map((s, i) => {
      const y = 1 - (i / (n - 1)) * 2; // 1 → -1
      const r = Math.sqrt(1 - y * y);
      const phi = i * Math.PI * (3 - Math.sqrt(5)); // golden angle
      return {
        name: s.name,
        color: GROUP_COLOR[s.group],
        pos: new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r).multiplyScalar(
          R * (0.75 + (i % 3) * 0.12),
        ),
        size: 0.17,
      };
    });

    // Connect each node to its 2 nearest neighbours; dedupe undirected pairs.
    const edgeSet = new Set<string>();
    const edges: [number, number][] = [];
    nodes.forEach((node, i) => {
      const nearest = nodes
        .map((o, j) => ({ j, d: node.pos.distanceTo(o.pos) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      nearest.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([i, j]);
        }
      });
    });

    // Adjacency for hover highlighting.
    const adj: number[][] = nodes.map(() => []);
    edges.forEach(([a, b]) => {
      adj[a].push(b);
      adj[b].push(a);
    });

    return { nodes, edges, adj };
  }, []);
}

function edgeGeometry(nodes: NodeData[], pairs: [number, number][]) {
  const positions = new Float32Array(pairs.length * 6);
  pairs.forEach(([a, b], i) => {
    positions.set([nodes[a].pos.x, nodes[a].pos.y, nodes[a].pos.z], i * 6);
    positions.set([nodes[b].pos.x, nodes[b].pos.y, nodes[b].pos.z], i * 6 + 3);
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geo;
}

function Node({
  data,
  active,
  onOver,
  onOut,
}: {
  data: NodeData;
  active: boolean;
  onOver: () => void;
  onOut: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 2 + data.pos.x) * 0.15;
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = active ? 1.8 : pulse;
  });

  return (
    <group position={data.pos}>
      <mesh
        ref={mesh}
        scale={active ? data.size * 1.6 : data.size}
        onPointerOver={(e) => {
          e.stopPropagation();
          onOver();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onOut();
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.6}
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>
      {active && (
        <Html center distanceFactor={9} zIndexRange={[100, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { nodes, edges, adj } = useGraph();
  const [hovered, setHovered] = useState<number | null>(null);

  const baseEdges = useMemo(() => edgeGeometry(nodes, edges), [nodes, edges]);
  const activeEdges = useMemo(() => {
    if (hovered === null) return null;
    const pairs = adj[hovered].map((j) => [hovered, j] as [number, number]);
    return edgeGeometry(nodes, pairs);
  }, [hovered, nodes, adj]);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06;
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;
    state.camera.position.x = pointer.current.x * 1.5;
    state.camera.position.y = 1.4 + pointer.current.y * 1.2;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <lineSegments geometry={baseEdges}>
        <lineBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {activeEdges && (
        <lineSegments geometry={activeEdges}>
          <lineBasicMaterial
            color="#fcd34d"
            transparent
            opacity={0.9}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
      {nodes.map((node, i) => (
        <Node
          key={node.name}
          data={node}
          active={hovered === i}
          onOver={() => setHovered(i)}
          onOut={() => setHovered((h) => (h === i ? null : h))}
        />
      ))}
    </group>
  );
}

export default function SkillsGalaxy() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      camera={{ position: [0, 1.4, 9], fov: 55 }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 0, 0]} intensity={18} color="#fbbf24" distance={26} />
      <Network />
    </Canvas>
  );
}
