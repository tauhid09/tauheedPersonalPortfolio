import { useState, useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Edges } from '@react-three/drei';
import * as THREE from 'three';
import type { CodeSnippet } from '../../../data/snippets.ts';

interface CodePanelProps {
  snippet: CodeSnippet;
  initialPosition: [number, number, number];
  width?: number;
  height?: number;
  floatSpeed?: number;
  floatPhase?: number;
  typingDelay?: number;
}

export function CodePanel({
  snippet,
  initialPosition,
  width = 2.8,
  height = 1.35,
  floatSpeed = 1,
  floatPhase = 0,
  typingDelay = 200,
}: CodePanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeCodeTarget, setActiveCodeTarget] = useState(snippet.code);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 450);
    return () => clearInterval(cursorInterval);
  }, []);

  // Character-by-character typing & alternating loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting) {
      if (charCount < activeCodeTarget.length) {
        // Typing forward: ~40ms/char
        timeoutId = setTimeout(
          () => {
            setCharCount((prev) => prev + 1);
          },
          charCount === 0 ? typingDelay : 38
        );
      } else {
        // Fully typed: wait 12-14 seconds before erasing
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 12000 + Math.random() * 2000);
      }
    } else {
      if (charCount > 0) {
        // Erasing: ~18ms/char
        timeoutId = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, 18);
      } else {
        // Completely erased: swap snippet and type back forward
        setIsDeleting(false);
        setActiveCodeTarget((prev) =>
          prev === snippet.code ? snippet.altCode : snippet.code
        );
      }
    }

    return () => clearTimeout(timeoutId);
  }, [charCount, isDeleting, activeCodeTarget, snippet, typingDelay]);

  // Floating & subtle rotation motion
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Floating sin-based y offset (0.15 amplitude)
    groupRef.current.position.y =
      initialPosition[1] + Math.sin(t * floatSpeed + floatPhase) * 0.15;

    // Very slight rotation (max ~2.5 degrees = 0.04 rad)
    groupRef.current.rotation.z =
      Math.sin(t * floatSpeed * 0.6 + floatPhase) * 0.035;
    groupRef.current.rotation.y =
      Math.cos(t * floatSpeed * 0.4 + floatPhase) * 0.04;
  });

  const visibleText = useMemo(() => {
    return activeCodeTarget.slice(0, charCount);
  }, [activeCodeTarget, charCount]);

  // Color selection based on snippet category
  const accentColor =
    snippet.category === 'Apex'
      ? '#D92D20'
      : snippet.category === 'LWC JS' || snippet.category === 'SOQL'
      ? '#10B981'
      : '#E5E5E5';

  return (
    <group ref={groupRef} position={initialPosition}>
      {/* Translucent Panel Glass Base */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color="#0C0C0B"
          transparent
          opacity={0.35}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
        {/* 1px Thin Outline Border */}
        <Edges
          scale={1}
          threshold={15}
          color={accentColor}
          renderOrder={1000}
        >
          <lineBasicMaterial
            color={accentColor}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </Edges>
      </mesh>

      {/* Header Tab Line: File Name & Category Tag */}
      <group position={[-width / 2 + 0.12, height / 2 - 0.14, 0.01]}>
        <Text
          fontSize={0.065}
          color="#888888"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.02}
        >
          {`// ${snippet.category} • ${snippet.fileName}`}
        </Text>
      </group>

      {/* Body Code Content */}
      <group position={[-width / 2 + 0.12, height / 2 - 0.32, 0.01]}>
        <Text
          fontSize={0.078}
          color="#CCCCCC"
          anchorX="left"
          anchorY="top"
          maxWidth={width - 0.24}
          lineHeight={1.38}
          letterSpacing={-0.01}
        >
          {visibleText + (cursorVisible ? ' ▌' : '')}
        </Text>
      </group>
    </group>
  );
}
