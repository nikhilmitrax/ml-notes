import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls, Environment } from '@react-three/drei';
import { BookOpen } from 'lucide-react';
import StandardLLMScene from './scenes/StandardLLMScene';
import AutoencoderVisual from './scenes/AutoencoderVisual';
import CALMFlow from './scenes/CALMFlow';
import Controls from './Controls';
import Paragraph from '../../components/Paragraph';
import { STEPS, COLORS } from './constants';

export const unfinished = true;

const MainScene = ({ step, kValue }) => {
  return (
    <>
      {step === 'intro' && <StandardLLMScene />}
      {step === 'calm-concept' && (
        <group>
          <StandardLLMScene />
          <group position={[0, -3, 0]}>
            <CALMFlow kValue={4} />
          </group>
        </group>
      )}
      {step === 'autoencoder' && <AutoencoderVisual kValue={kValue} />}
      {step === 'comparison' && (
        <group>
          <group position={[0, 2, 0]} scale={0.8}>
            <Text position={[-4, 0, 0]} fontSize={0.3} color="#64748b" anchorX="right">Standard (T steps)</Text>
            <StandardLLMScene />
          </group>
          <group position={[0, -2, 0]} scale={0.8}>
            <Text position={[-4, 0, 0]} fontSize={0.3} color={COLORS.vector} anchorX="right">CALM (T/{kValue} steps)</Text>
            <CALMFlow kValue={kValue} />
          </group>
        </group>
      )}
    </>
  );
};

export default function CalmApp() {
  const [stepIndex, setStepIndex] = useState(0);
  const [kValue, setKValue] = useState(4);
  const currentStep = STEPS[stepIndex];

  return (
    <div className="w-full h-screen bg-slate-50 font-sans overflow-hidden relative selection:bg-violet-200">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CALM</h1>
          <Paragraph variant="small" className="text-slate-500 font-medium mb-0">Continuous Autoregressive Language Models</Paragraph>
        </div>
        <a
          href="https://arxiv.org/abs/2510.27688"
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/50 hover:bg-white px-3 py-1.5 rounded-full backdrop-blur transition-colors border border-slate-200"
        >
          <BookOpen size={14} /> View Paper (arXiv)
        </a>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

          <Environment preset="city" />

          <MainScene step={currentStep.id} kValue={kValue} />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      {/* Interactive UI Controls */}
      <Controls
        stepIndex={stepIndex}
        setStepIndex={setStepIndex}
        kValue={kValue}
        setKValue={setKValue}
      />
    </div>
  );
}
