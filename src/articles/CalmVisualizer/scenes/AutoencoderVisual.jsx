import React, { useState, useEffect } from 'react';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import Token from '../components/Token';
import ContinuousVector from '../components/ContinuousVector';
import ConnectionLine from '../components/ConnectionLine';
import { COLORS } from '../constants';

const AutoencoderVisual = ({ kValue }) => {
    // Visualize K tokens compressing into 1 vector, then decompressing
    const [stage, setStage] = useState(0); // 0: tokens, 1: compressing, 2: vector, 3: decompressing
    const words = ["Overcoming", "this", "bottleneck", "requires", "a", "new", "design", "axis"];

    useEffect(() => {
        const interval = setInterval(() => {
            setStage(prev => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const groupWidth = (kValue - 1) * 1.2;
    const center = groupWidth / 2;
    const currentWords = words.slice(0, kValue);

    return (
        <group position={[0, -1, 0]}>
            <Text position={[0, 3.5, 0]} color={COLORS.text} fontSize={0.4} anchorX="center">
                The Autoencoder (K={kValue})
            </Text>

            {/* Input Tokens */}
            <group position={[-4, 0, 0]}>
                <Text position={[center, 1.5, 0]} color={COLORS.text} fontSize={0.25}>Input Chunk ($x_{`1:K`}$)</Text>
                {currentWords.map((word, i) => {
                    const x = i * 1.2;
                    // Animation logic
                    const isVisible = stage === 0 || stage === 1 || stage === 3;
                    const isMovingToEncoder = stage === 1;

                    let pos = [x, 0, 0];
                    if (isMovingToEncoder) pos = [THREE.MathUtils.lerp(x, center + 2, 0.8), 0, 0];

                    return (
                        <group key={i} position={pos}>
                            <Token
                                label={word}
                                opacity={isVisible ? 1 : 0}
                                scale={isMovingToEncoder ? 0.5 : 1}
                            />
                            {/* Lines to Encoder */}
                            <ConnectionLine start={[0, 0, 0]} end={[4 - x, 0, 0]} active={stage === 1} />
                        </group>
                    );
                })}
            </group>

            {/* The Vector (Latent Space) */}
            <group position={[0, 0, 0]}>
                <Text position={[0, 1.5, 0]} color={COLORS.vector} fontSize={0.25}>Latent Vector ($z$)</Text>
                <ContinuousVector position={[0, 0, 0]} active={stage === 1 || stage === 2} scale={stage === 2 ? 1.2 : 0} />

                {/* Encoder/Decoder Boxes */}
                <mesh position={[-2, 0, 0]}>
                    <boxGeometry args={[0.5, 2, 2]} />
                    <meshStandardMaterial color="#94a3b8" transparent opacity={0.2} />
                    <Html center><div className="text-xs font-bold text-slate-500">ENC</div></Html>
                </mesh>
                <mesh position={[2, 0, 0]}>
                    <boxGeometry args={[0.5, 2, 2]} />
                    <meshStandardMaterial color="#94a3b8" transparent opacity={0.2} />
                    <Html center><div className="text-xs font-bold text-slate-500">DEC</div></Html>
                </mesh>
            </group>

            {/* Output Tokens */}
            <group position={[4, 0, 0]}>
                <Text position={[center, 1.5, 0]} color={COLORS.text} fontSize={0.25}>Reconstruction</Text>
                {currentWords.map((word, i) => {
                    const x = i * 1.2;
                    const isVisible = stage === 3;
                    return (
                        <group key={i} position={[x, 0, 0]}>
                            <Token
                                label={word}
                                color={COLORS.secondary}
                                opacity={isVisible ? 1 : 0.1}
                            />
                            <ConnectionLine start={[-2 - x, 0, 0]} end={[0, 0, 0]} active={stage === 3} />
                        </group>
                    );
                })}
            </group>
        </group>
    );
};

export default AutoencoderVisual;
