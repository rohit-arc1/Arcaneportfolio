import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars, SpotLight, Environment, ScrollControls } from '@react-three/drei';

export const ThreeScene = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas dpr={[1, 2]}>
        <ScrollControls pages={3} damping={0.2}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={40} />
          <color attach="background" args={['#000000']} />
          
          <Environment preset="city" />
          
          <ambientLight intensity={0.1} />
          <SpotLight 
            position={[15, 20, 10]} 
            angle={0.3} 
            penumbra={1} 
            intensity={3} 
            color="#C9A14A" 
          />
          
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0} />
          
          <fog attach="fog" args={['#000000', 5, 30]} />
        </ScrollControls>
      </Canvas>
    </div>
  );
};
