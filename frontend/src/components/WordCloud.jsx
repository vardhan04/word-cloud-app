import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

function Word({ word, weight, position, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y += 0.001;
    }
  });

  const fontSize = 0.5 + weight * 2.0;
  const displayWeight = (weight * 100).toFixed(1);

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <Text
        fontSize={fontSize}
        color={hovered ? '#ffffff' : color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={hovered ? 0.04 : 0.02}
        outlineColor={hovered ? color : "#000000"}
      >
        {word}
      </Text>
      {hovered && (
        <Html distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            border: `2px solid ${color}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            transform: 'translateY(-40px)'
          }}>
            {word}
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
              Relevance: {displayWeight}%
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function WordCloudScene({ words }) {
  const wordElements = useMemo(() => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
      '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
      '#F8B739', '#52B788', '#EF476F', '#06FFA5'
    ];

    return words.map((wordData, index) => {
      const phi = Math.acos(1 - 2 * (index + 0.5) / words.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * index;
      const radius = 5 + wordData.weight * 3;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const color = colors[index % colors.length];

      return {
        ...wordData,
        position: [x, y, z],
        color
      };
    });
  }, [words]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {wordElements.map((wordData, index) => (
        <Word
          key={index}
          word={wordData.word}
          weight={wordData.weight}
          position={wordData.position}
          color={wordData.color}
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
}

export default function WordCloud({ words }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#1a1a2e']} />
      <WordCloudScene words={words} />
    </Canvas>
  );
}
