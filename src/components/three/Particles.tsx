import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  radius: number;
  scrollProgress: number;
}

const Particles: React.FC<ParticlesProps> = ({ count, radius, scrollProgress }) => {
  const mesh = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array>();
  const velocities = useRef<Float32Array>();

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = radius * (0.5 + Math.random() * 0.5);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      vels[i * 3] = (Math.random() - 0.5) * 0.01;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 0.5 + Math.random() * 0.5;
    }

    initialPositions.current = positions.slice();
    velocities.current = vels;
    return [positions, colors];
  }, [count, radius]);

  useFrame(() => {
    if (mesh.current && initialPositions.current && velocities.current) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      const expansionFactor = 1 + scrollProgress * 3;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const targetX = initialPositions.current[i3] * expansionFactor;
        const targetY = initialPositions.current[i3 + 1] * expansionFactor;
        const targetZ = initialPositions.current[i3 + 2] * expansionFactor;

        positions[i3] += (targetX - positions[i3]) * 0.1 + velocities.current[i3];
        positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.1 + velocities.current[i3 + 1];
        positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.1 + velocities.current[i3 + 2];

        velocities.current[i3] *= 0.99;
        velocities.current[i3 + 1] *= 0.99;
        velocities.current[i3 + 2] *= 0.99;
      }

      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default Particles;
