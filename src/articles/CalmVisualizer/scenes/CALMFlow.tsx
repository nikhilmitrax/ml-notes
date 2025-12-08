import React from 'react';
import { Text, Line } from '@react-three/drei';
import Token from '../components/Token';
import ContinuousVector from '../components/ContinuousVector';
import { COLORS } from '../constants';

const CALMFlow = ({ kValue }) => {
    // Visualize the sequence of VECTORS
    const vectorCount = 3;

    return (
        <group>
            <Text position={[0, 3, 0]} color={COLORS.text} fontSize={0.4} anchorX="center">
                Next-Vector Prediction (Sequence Length / {kValue})
            </Text>

            {Array.from({ length: vectorCount }).map((_, i) => (
                <group key={i} position={[(i - 1) * 3.5, 0, 0]}>
                    <ContinuousVector active={true} />
                    {/* Arrow between vectors */}
                    {i < vectorCount - 1 && (
                        <group position={[1.75, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                            <mesh>
                                <coneGeometry args={[0.2, 0.5, 16]} />
                                <meshStandardMaterial color={COLORS.token} />
                            </mesh>
                        </group>
                    )}

                    {/* Projection to tokens below */}
                    <group position={[0, -2, 0]}>
                        <Line points={[[0, 1.5, 0], [0, 0.5, 0]]} color={COLORS.token} dashed opacity={0.5} />
                        {/* K small tokens */}
                        {Array.from({ length: kValue }).map((__, j) => (
                            <Token
                                key={j}
                                position={[(j - (kValue - 1) / 2) * 0.6, 0, 0]}
                                scale={0.4}
                                color={COLORS.text}
                                opacity={0.6}
                            />
                        ))}
                        <Text position={[0, -0.8, 0]} fontSize={0.15} color={COLORS.text}>
                            {kValue} Tokens
                        </Text>
                    </group>
                </group>
            ))}
        </group>
    );
};

export default CALMFlow;
