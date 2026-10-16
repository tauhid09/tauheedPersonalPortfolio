import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  speedMultiplier?: number;
}

export function ParticleField({ count = 450, speedMultiplier = 1 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate procedural canvas texture containing code glyphs ({, }, <, >, ;, =) and dots
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, 128, 128);
      // Soft glowing circular particle
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(217, 45, 32, 0.8)');
      grad.addColorStop(0.7, 'rgba(217, 45, 32, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(64, 64, 60, 0, Math.PI * 2);
      ctx.fill();

      // Draw subtle glyph
      ctx.font = 'bold 36px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('{ ; }', 64, 64);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Geometry positions and speeds
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Concentrate more on the right 55% of the scene (x between -2 and 7)
      pos[i * 3] = (Math.random() - 0.2) * 12; // x: -2.4 to 9.6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16; // y: -8 to 8
      pos[i * 3 + 2] = -6 + Math.random() * 6; // z: -6 to 0
      spd[i] = 0.2 + Math.random() * 0.4;
    }

    return [pos, spd];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const dt = Math.min(delta, 0.1);
    for (let i = 0; i < count; i++) {
      // Drift upwards
      array[i * 3 + 1] += speeds[i] * dt * speedMultiplier;
      // Wrap around when passing upper bound
      if (array[i * 3 + 1] > 8) {
        array[i * 3 + 1] = -8;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.18}
        map={texture}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
