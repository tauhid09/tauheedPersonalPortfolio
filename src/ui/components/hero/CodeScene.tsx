import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CODE_SNIPPETS } from '../../../data/snippets.ts';
import { CodePanel } from './CodePanel.tsx';
import { ParticleField } from './ParticleField.tsx';
import { NodeNetwork } from './NodeNetwork.tsx';

interface CodeSceneProps {
  mouseNormRef: React.MutableRefObject<{ x: number; y: number }>;
  isFastParticles?: boolean;
}

function CameraAndLightRig({
  mouseNormRef,
  isMobile,
}: {
  mouseNormRef: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!isMobile) {
      // Ease camera (lerp 0.05) by up to ±0.6 on x and ±0.4 on y based on mouse position
      const targetX = mouseNormRef.current.x * 0.6;
      const targetY = mouseNormRef.current.y * 0.4;
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
      state.camera.lookAt(1, 0, 0);

      // Coral point light following mouse
      if (lightRef.current) {
        lightRef.current.position.x = THREE.MathUtils.lerp(
          lightRef.current.position.x,
          mouseNormRef.current.x * 4 + 2,
          0.08
        );
        lightRef.current.position.y = THREE.MathUtils.lerp(
          lightRef.current.position.y,
          mouseNormRef.current.y * 3,
          0.08
        );
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight
        ref={lightRef}
        position={[2.5, 0.5, 2]}
        color="#D92D20"
        intensity={1.8}
        distance={12}
      />
      <pointLight position={[5, -2, -2]} color="#10B981" intensity={0.9} distance={10} />
      {/* Fog matched to dark theme background */}
      <fog attach="fog" args={['#0F0F0E', 4.5, 14]} />
    </>
  );
}

export function CodeScene({ mouseNormRef, isFastParticles = false }: CodeSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause rendering when tab is hidden or hero is out of view
  useEffect(() => {
    const handleVisibility = () => {
      setIsInView(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const particleCount = isMobile ? 150 : 500;
  const particleSpeed = isFastParticles ? 2.2 : 1;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 48 }}
      frameloop={isInView ? 'always' : 'never'}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      className="w-full h-full"
    >
      <CameraAndLightRig mouseNormRef={mouseNormRef} isMobile={isMobile} />

      {/* Particle Dust Field with Additive Blending */}
      <ParticleField count={particleCount} speedMultiplier={particleSpeed} />

      {/* Background CRM Entity Relational Graph */}
      {!isMobile && <NodeNetwork />}

      {/* 6-8 Floating Code Panels positioned in the right 55% */}
      {isMobile ? (
        // Mobile layout: 3 compact panels
        <>
          <CodePanel
            snippet={CODE_SNIPPETS[0]}
            initialPosition={[0.2, 1.1, 0]}
            width={2.7}
            height={1.3}
            floatSpeed={0.9}
            floatPhase={0.2}
            typingDelay={200}
          />
          <CodePanel
            snippet={CODE_SNIPPETS[2]}
            initialPosition={[0.4, -0.4, -0.8]}
            width={2.5}
            height={1.15}
            floatSpeed={1.1}
            floatPhase={1.5}
            typingDelay={800}
          />
          <CodePanel
            snippet={CODE_SNIPPETS[4]}
            initialPosition={[0.1, -1.8, -1.6]}
            width={2.5}
            height={1.1}
            floatSpeed={1.0}
            floatPhase={2.8}
            typingDelay={1400}
          />
        </>
      ) : (
        // Desktop layout: 7 panels floating at depths from z: -4.5 to 0.4
        <>
          {/* Panel 1: Apex Opportunity Trigger */}
          <CodePanel
            snippet={CODE_SNIPPETS[0]}
            initialPosition={[1.8, 1.4, 0.2]}
            width={3.1}
            height={1.35}
            floatSpeed={0.9}
            floatPhase={0}
            typingDelay={150}
          />

          {/* Panel 2: Apex LeadService Batch */}
          <CodePanel
            snippet={CODE_SNIPPETS[1]}
            initialPosition={[3.6, -1.1, -1.2]}
            width={2.8}
            height={1.25}
            floatSpeed={1.1}
            floatPhase={1.2}
            typingDelay={600}
          />

          {/* Panel 3: LWC JS Wire Adapter */}
          <CodePanel
            snippet={CODE_SNIPPETS[2]}
            initialPosition={[2.2, -0.05, 0.5]}
            width={2.6}
            height={1.15}
            floatSpeed={1.0}
            floatPhase={2.4}
            typingDelay={1000}
          />

          {/* Panel 4: LWC Datatable HTML */}
          <CodePanel
            snippet={CODE_SNIPPETS[3]}
            initialPosition={[4.3, 0.95, -2.5]}
            width={2.7}
            height={1.2}
            floatSpeed={0.85}
            floatPhase={3.5}
            typingDelay={1400}
          />

          {/* Panel 5: SOQL Pipeline Query */}
          <CodePanel
            snippet={CODE_SNIPPETS[4]}
            initialPosition={[1.4, -1.75, -0.6]}
            width={2.5}
            height={1.1}
            floatSpeed={1.15}
            floatPhase={4.2}
            typingDelay={1800}
          />

          {/* Panel 6: Flow / OpenAI Callout */}
          <CodePanel
            snippet={CODE_SNIPPETS[5]}
            initialPosition={[4.0, -2.3, -3.2]}
            width={2.7}
            height={1.15}
            floatSpeed={0.95}
            floatPhase={5.0}
            typingDelay={2200}
          />

          {/* Panel 7: Security Inaccessible Check */}
          <CodePanel
            snippet={CODE_SNIPPETS[6]}
            initialPosition={[3.1, 2.35, -4.0]}
            width={2.8}
            height={1.2}
            floatSpeed={0.8}
            floatPhase={0.8}
            typingDelay={2600}
          />
        </>
      )}
    </Canvas>
  );
}
