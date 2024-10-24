import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import { Vector3, CatmullRomCurve3 } from 'three';

interface AttackLinesProps {
  count: number;
  radius: number;
  scrollProgress: number;
}

const AttackLines: React.FC<AttackLinesProps> = ({ count, radius, scrollProgress }) => {
  const linesRef = useRef<Array<{ curve: CatmullRomCurve3; progress: number }>>([]);

  const generateRandomPoint = () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = radius * (1.05 + Math.random() * 0.1); // Ensure points are outside the sphere
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    return new Vector3(x, y, z);
  };

  const createCurve = (start: Vector3, end: Vector3) => {
    const midPoint1 = new Vector3().addVectors(start, end).multiplyScalar(0.25);
    const midPoint2 = new Vector3().addVectors(start, end).multiplyScalar(0.75);
    midPoint1.normalize().multiplyScalar(radius * 1.2);
    midPoint2.normalize().multiplyScalar(radius * 1.2);
    return new CatmullRomCurve3([start, midPoint1, midPoint2, end], false, 'catmullrom', 0.5);
  };

  // Initialize attack lines
  useMemo(() => {
    linesRef.current = Array(count).fill(0).map(() => ({
      curve: createCurve(generateRandomPoint(), generateRandomPoint()),
      progress: Math.random()
    }));
  }, [count, radius]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    linesRef.current = linesRef.current.map(line => {
      line.progress += (0.001 + scrollProgress * 0.003) * (1 + Math.sin(time) * 0.5);
      if (line.progress >= 1) {
        return {
          curve: createCurve(generateRandomPoint(), generateRandomPoint()),
          progress: 0
        };
      }
      return line;
    });
  });

  return (
    <group>
      {linesRef.current.map((line, index) => {
        const points = line.curve.getPoints(50);
        const position = line.curve.getPointAt(line.progress);
        return (
          <group key={index}>
            <Line
              points={points}
              color="#00ffff"
              lineWidth={1}
              dashed={false}
            />
            <Sphere
              args={[0.02, 16, 16]}
              position={position}
            >
              <meshBasicMaterial color="#00ffff" />
            </Sphere>
          </group>
        );
      })}
    </group>
  );
};

export default AttackLines;
