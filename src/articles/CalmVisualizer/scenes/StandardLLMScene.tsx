import React, { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import Token from '../components/Token';
import ConnectionLine from '../components/ConnectionLine';
import { COLORS } from '../constants';

const StandardLLMScene = () => {
    // Visualize discrete tokens appearing one by one
    const [visibleCount, setVisibleCount] = useState(0);
    const words = ["The", "efficiency", "of", "LLMs", "is", "limited"];

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleCount(prev => (prev + 1) % (words.length + 1));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <group position={[-2.5, 0, 0]}>
            <Text
                position={[2.5, 2, 0]}
                color={COLORS.text}
                fontSize={0.4}
                anchorX="center"
                anchorY="middle"
            >
                Standard: Next-Token Prediction
            </Text>

            {words.map((word, i) => (
                <React.Fragment key={i}>
                    {i < visibleCount && (
                        <Token
                            position={[i * 1.2, 0, 0]}
                            label={word}
                            isTarget={i === visibleCount - 1}
                        />
                    )}
                    {/* Ghost tokens for future */}
                    {i >= visibleCount && (
                        <Token
                            position={[i * 1.2, 0, 0]}
                            opacity={0.1}
                            scale={0.9}
                        />
                    )}
                </React.Fragment>
            ))}

            {/* Connection arrow */}
            {visibleCount > 0 && visibleCount <= words.length && (
                <ConnectionLine
                    start={[(visibleCount - 1) * 1.2, 0, 0]}
                    end={[visibleCount * 1.2, 0, 0]}
                    active={true}
                />
            )}
        </group>
    );
};

export default StandardLLMScene;
