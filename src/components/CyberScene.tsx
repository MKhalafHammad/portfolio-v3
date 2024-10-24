import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Earth from './three/Earth';
import Particles from './three/Particles';
import ErrorBoundary from './ErrorBoundary';

const CyberScene: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollPosition / maxScroll;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Suspense fallback={null}>
          <group position-y={scrollProgress * -6}>
            <Earth 
              radius={0.25} 
              scrollProgress={scrollProgress}
            />
            <Particles 
              count={1000} 
              radius={1} 
              scrollProgress={scrollProgress} // Pass scrollProgress to Particles
            />
          </group>
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default CyberScene;
