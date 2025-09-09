// src/components/ModelViewer.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import modelPath from '../../assets/category/modal3d.glb';
import { FaGroupArrowsRotate } from "react-icons/fa6";
function Model() {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} scale={2.5} />;
}

useGLTF.preload(modelPath);

export default function ModelViewer() {
    return (
        <div className="bg-gradient-to-b from-black via-red-600 to-black flex flex-col items-center py-8">
            <h2 className="text-white text-xl md:text-5xl font-semibold mb-4 flex items-center">
                Drag to view 360° <FaGroupArrowsRotate className='ml-4' />
            </h2>

            <Canvas style={{ height: '500px', width: '50%' }}>
                <ambientLight />
                <directionalLight position={[5, 5, 5]} />
                <OrbitControls />
                <Model />
            </Canvas>
        </div>
    );
}
