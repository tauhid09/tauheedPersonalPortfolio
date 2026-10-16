import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 40 CRM node positions and line pairs connecting nearby nodes
  const { nodePositions, lineGeometry } = useMemo(() => {
    const nodeCount = 38;
    const positions: [number, number, number][] = [];
    const radius = 3.5;

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution for harmonious spacing
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = radius * (0.75 + Math.sin(i * 1.5) * 0.25);
      positions.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]);
    }

    // Connect nodes within a distance threshold
    const lineIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.2) {
          lineIndices.push(
            positions[i][0], positions[i][1], positions[i][2],
            positions[j][0], positions[j][1], positions[j][2]
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(lineIndices, 3)
    );

    const flatNodePos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      flatNodePos[i * 3] = positions[i][0];
      flatNodePos[i * 3 + 1] = positions[i][1];
      flatNodePos[i * 3 + 2] = positions[i][2];
    }
    const nodesGeo = new THREE.BufferGeometry();
    nodesGeo.setAttribute('position', new THREE.BufferAttribute(flatNodePos, 3));

    return { nodePositions: nodesGeo, lineGeometry: lineGeo };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.05 * delta;
    groupRef.current.rotation.x += 0.02 * delta;
  });

  return (
    <group ref={groupRef} position={[3.2, 0.2, -5.5]}>
      {/* Network Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#D92D20"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes / CRM Entities */}
      <points geometry={nodePositions}>
        <pointsMaterial
          size={0.12}
          color="#10B981"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
