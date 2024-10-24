import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, ShaderMaterial, TextureLoader } from 'three';

interface EarthProps {
  radius: number;
  scrollProgress: number;
}

const Earth: React.FC<EarthProps> = ({ radius, scrollProgress }) => {
  const earthRef = useRef<Mesh>(null);
  const earthTexture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        earthTexture: { value: earthTexture },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D earthTexture;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vec4 texColor = texture2D(earthTexture, vUv);
          gl_FragColor = texColor;
        }
      `
    });
  }, [earthTexture]);

  useFrame(({ clock }) => {
    if (earthRef.current && shaderMaterial) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      earthRef.current.rotation.x = scrollProgress * 0.5;
      
      // Update shader uniforms
      shaderMaterial.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={earthRef} material={shaderMaterial}>
      <sphereGeometry args={[radius, 64, 64]} />
    </mesh>
  );
};

export default Earth;
