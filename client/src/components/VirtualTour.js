import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Loader from './Loader';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

function VirtualTourScene({ modelUrl }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="canvas-container">
      {isLoading && <Loader />}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true }}
        onCreated={() => setIsLoading(false)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
          />
          <Environment preset="city" />
          {modelUrl && <Model url={modelUrl} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default VirtualTourScene;