import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';

interface ProfilePhotoProps {
  scrollProgress: number;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ scrollProgress }) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, '/profile.png');

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
      
      // Scale and position based on scroll
      float scale = 1.0 + scroll * 0.2;
      pos.xyz *= scale;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D texture1;
    uniform float time;
    uniform float scroll;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Glitch effect
      float glitchIntensity = scroll * 0.1;
      float glitch = step(0.99 + glitchIntensity * sin(time * 10.0), 1.0);
      uv.x += glitch * 0.02 * sin(time * 50.0);
      
      // RGB split based on scroll
      float rgbSplit = scroll * 0.02;
      vec4 r = texture2D(texture1, uv + vec2(rgbSplit, 0.0));
      vec4 g = texture2D(texture1, uv);
      vec4 b = texture2D(texture1, uv - vec2(rgbSplit, 0.0));
      
      gl_FragColor = vec4(r.r, g.g, b.b, g.a);
    }
  `;

  const uniforms = useMemo(
    () => ({
      texture1: { value: texture },
      time: { value: 0 },
      scroll: { value: 0 },
      resolution: { value: new Vector2() }
    }),
    [texture]
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
      
      // Move on scroll
      meshRef.current.position.y = 2 - scrollProgress * 1.5;
    }
  });

  return (
    <mesh ref={meshRef} material={material} position={[0, 2, 0]}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

export default ProfilePhoto;