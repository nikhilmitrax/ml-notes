import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Html } from '@react-three/drei';
import { COLORS } from '../constants';

const ContinuousVector = ({ position, scale = 1, active }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (mesh.current) {
            // Pulse effect
            const pulse = active ? 1 + Math.sin(t * 3) * 0.1 : 1;
            mesh.current.scale.setScalar(scale * pulse);
            mesh.current.rotation.z = t * 0.2;
        }
    });

    return (
        <group position={position}>
            <Float speed={5} rotationIntensity={1} floatIntensity={0.5}>
                <Sphere
                    ref={mesh}
                    args={[0.6, 64, 64]}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <MeshDistortMaterial
                        color={hovered ? COLORS.accent : COLORS.vector}
                        distort={0.4}
                        speed={2}
                        roughness={0.1}
                        metalness={0.5}
                    />
                </Sphere>
                <Html position={[0, -0.8, 0]} center>
                    <div className={`transition-opacity duration-300 ${active || hovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-xs font-bold text-violet-700 bg-violet-100 px-2 py-1 rounded-full shadow-sm whitespace-nowrap">
                            Continuous Vector $z$
                        </div>
                    </div>
                </Html>
            </Float>
            {/* Energy Field visualization (rings) */}
            {active && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                    <ringGeometry args={[0.8, 0.85, 32]} />
                    <meshBasicMaterial color={COLORS.vector} transparent opacity={0.3} />
                </mesh>
            )}
        </group>
    );
};

export default ContinuousVector;
