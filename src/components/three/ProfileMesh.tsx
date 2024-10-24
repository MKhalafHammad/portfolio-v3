import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';

interface ProfileMeshProps {
  scrollProgress: number;
}

const ProfileMesh: React.FC<ProfileMeshProps> = ({ scrollProgress }) => {
  const meshRef = useRef<Mesh>(null);

  const vertexShader = `
    varying vec2 vUv;
    uniform float time;
    uniform float scroll;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Add wave effect based on scroll
      float wave = sin(position.y * 10.0 + time) * 0.02 * scroll;
      pos.x += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform float scroll;
    varying vec2 vUv;
    
    void main() {
      vec3 color = vec3(0.0, 0.8, 1.0); // Cyan color
      
      // Add wave pattern
      float wave = sin(vUv.x * 20.0 + time) * sin(vUv.y * 20.0 + time) * scroll;
      color += vec3(wave * 0.5);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      scroll: { value: 0 },
      resolution: { value: new Vector2() }
    }),
    []
  );

  const material = useMemo(
    () => new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    }),
    [uniforms]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      material.uniforms.time.value = clock.getElapsedTime();
      material.uniforms.scroll.value = scrollProgress;
      
      // Rotate based on scroll
      meshRef.current.rotation.z = scrollProgress * Math.PI * 0.1;
    }
  });

  return (
    <group position={[0, 2 - scrollProgress * 1.5, 0]}>
      <mesh ref={meshRef} material={material}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="cyan"
        anchorX="center"
        anchorY="middle"
        opacity={1 - scrollProgress}
      >
        Mohamed K. Hammad
      </Text>
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.15}
        color="cyan"
        anchorX="center"
        anchorY="middle"
        opacity={1 - scrollProgress}
      >
        Cybersecurity Expert
      </Text>
    </group>
  );
};

export default ProfileMesh;