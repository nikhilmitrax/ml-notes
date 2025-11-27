import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '../constants';

const ConnectionLine = ({ start, end, active }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current && active) {
            ref.current.material.dashOffset -= 0.02;
        }
    });

    const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

    return (
        <Line
            ref={ref}
            points={points}
            color={active ? COLORS.primary : '#cbd5e1'}
            lineWidth={2}
            dashed={active}
            dashScale={5}
            dashSize={1}
            gapSize={0.5}
            opacity={active ? 0.6 : 0.2}
            transparent
        />
    );
};

export default ConnectionLine;
