import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../constants';

const Token = ({ position, label, opacity = 1, scale = 1, color = COLORS.token, isTarget }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (hovered) {
            mesh.current.rotation.y += 0.05;
        } else {
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, 0, 0.1);
        }
    });

    return (
        <group position={position} scale={scale}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <RoundedBox
                    ref={mesh}
                    args={[0.8, 0.8, 0.8]}
                    radius={0.1}
                    smoothness={4}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <meshStandardMaterial
                        color={hovered ? COLORS.primary : color}
                        transparent
                        opacity={opacity}
                        roughness={0.3}
                        metalness={0.1}
                    />
                    {label && (
                        <Html position={[0, 0, 0.5]} transform scale={0.5} occlude>
                            <div className="pointer-events-none select-none text-xs font-bold text-slate-700 bg-white/80 px-1 rounded shadow-sm backdrop-blur-sm whitespace-nowrap">
                                {label}
                            </div>
                        </Html>
                    )}
                </RoundedBox>
            </Float>
        </group>
    );
};

export default Token;
