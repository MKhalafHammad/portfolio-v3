import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Earth from './three/Earth';
import Particles from './three/Particles';
import AttackLines from './three/AttackLines';
import ErrorBoundary from './ErrorBoundary';

const CyberScene: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI * 0.6}
          minPolarAngle={Math.PI * 0.4}
        />
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Suspense fallback={null}>
          <group position-y={scrollProgress * -2}>
            <Earth radius={2} scrollProgress={scrollProgress} />
            <Particles count={2000} radius={2 + scrollProgress * 4} scrollProgress={scrollProgress} />
            <AttackLines radius={2} scrollProgress={scrollProgress} />
          </group>
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default CyberScene;