import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import { Vector3 } from 'three';

interface AttackLinesProps {
  radius: number;
  scrollProgress: number;
}

const AttackLines: React.FC<AttackLinesProps> = ({ radius, scrollProgress }) => {
  const linesRef = useRef<Array<{ start: Vector3; end: Vector3; progress: number }>>([]);

  const generateRandomPoint = () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return new Vector3(x, y, z);
  };

  // Initialize attack lines
  useMemo(() => {
    linesRef.current = Array(15).fill(0).map(() => ({
      start: generateRandomPoint(),
      end: generateRandomPoint(),
      progress: Math.random()
    }));
  }, [radius]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    linesRef.current = linesRef.current.map(line => {
      line.progress += (0.005 + scrollProgress * 0.01) * (1 + Math.sin(time) * 0.5);
      if (line.progress >= 1) {
        return {
          start: generateRandomPoint(),
          end: generateRandomPoint(),
          progress: 0
        };
      }
      return line;
    });
  });

  return (
    <group>
      {linesRef.current.map((line, index) => (
        <group key={index}>
          <Line
            points={[line.start, line.end]}
            color="#00ffff"
            lineWidth={1}
            dashed={true}
            dashScale={50}
            dashSize={0.5}
            dashOffset={-1}
          />
          <Sphere
            args={[0.02, 16, 16]}
            position={line.start.clone().lerp(line.end, line.progress)}
          >
            <meshBasicMaterial color="#00ffff" />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

export default AttackLines;