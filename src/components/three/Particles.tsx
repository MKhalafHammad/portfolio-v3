import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  radius: number;
  scrollProgress: number;
}

const Particles: React.FC<ParticlesProps> = ({ count, radius, scrollProgress }) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius + Math.random() * 2;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count, radius]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const positions = points as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const explosionFactor = scrollProgress * 2;
      positions[i3] *= 1 + Math.sin(time + i) * 0.01 * explosionFactor;
      positions[i3 + 1] *= 1 + Math.cos(time + i) * 0.01 * explosionFactor;
      positions[i3 + 2] *= 1 + Math.sin(time + i) * 0.01 * explosionFactor;
    }
  });

  return (
    <Points positions={points}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        color="white"
      />
    </Points>
  );
};

export default Particles;