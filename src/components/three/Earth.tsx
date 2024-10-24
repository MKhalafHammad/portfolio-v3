import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Mesh, ShaderMaterial } from 'three';

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
        neonIntensity: { value: 0 }
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
        uniform float neonIntensity;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vec4 texColor = texture2D(earthTexture, vUv);
          
          // Edge detection for landmasses
          float edge = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          
          // Neon glow effect
          vec3 neonColor = vec3(0.0, 0.5, 1.0); // Neon blue
          vec3 finalColor = mix(texColor.rgb, neonColor, edge * neonIntensity);
          
          // Add pulsing neon effect
          float pulse = (sin(time * 2.0) * 0.5 + 0.5) * 0.5;
          finalColor += neonColor * edge * pulse * neonIntensity;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, [earthTexture]);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      earthRef.current.rotation.x = scrollProgress * 0.5;
      
      // Update shader uniforms
      shaderMaterial.uniforms.time.value = clock.getElapsedTime();
      shaderMaterial.uniforms.neonIntensity.value = 0.5 + scrollProgress * 0.5;
    }
  });

  return (
    <mesh ref={earthRef} material={shaderMaterial}>
      <sphereGeometry args={[radius, 64, 64]} />
    </mesh>
  );
};

export default Earth;