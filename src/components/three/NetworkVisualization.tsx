import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: string;
  position: [number, number, number];
  status: 'secure' | 'compromised' | 'warning';
  info: string;
}

interface Edge {
  start: string;
  end: string;
}

interface NetworkVisualizationProps {
  nodes: Node[];
  edges: Edge[];
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({ nodes, edges }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const nodePositions = useMemo(() => {
    const positions: { [key: string]: THREE.Vector3 } = {};
    nodes.forEach(node => {
      positions[node.id] = new THREE.Vector3(...node.position);
    });
    return positions;
  }, [nodes]);

  const nodeColors = useMemo(() => {
    return {
      secure: new THREE.Color(0x00ff00),
      compromised: new THREE.Color(0xff0000),
      warning: new THREE.Color(0xffff00),
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    camera.lookAt(new THREE.Vector3(...node.position));
  };

  return (
    <group ref={groupRef}>
      {nodes.map(node => (
        <Sphere
          key={node.id}
          position={node.position}
          args={[0.1, 32, 32]}
          onClick={() => handleNodeClick(node)}
        >
          <meshStandardMaterial color={nodeColors[node.status]} />
        </Sphere>
      ))}
      {edges.map((edge, index) => (
        <Line
          key={index}
          points={[nodePositions[edge.start], nodePositions[edge.end]]}
          color="white"
          lineWidth={1}
        />
      ))}
      {selectedNode && (
        <Html position={selectedNode.position}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            transform: 'translate3d(50%, -50%, 0)',
          }}>
            <h3>{selectedNode.id}</h3>
            <p>Status: {selectedNode.status}</p>
            <p>{selectedNode.info}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default NetworkVisualization;
