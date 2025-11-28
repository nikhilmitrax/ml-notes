import React, { useState, useEffect, useCallback } from 'react';
import { Box, ArrowRight, ArrowLeft, Database, Layers, Zap, Activity, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../../../components/Section';
import InteractiveCard from '../../../components/InteractiveCard';
import Equation from '../../../components/Equation';
import Paragraph from '../../../components/Paragraph';

// --- Simulation Hook ---

const NUM_LAYERS = 6;
const DELAY_FAST = 400;
const DELAY_NORMAL = 800;
const DELAY_LONG = 1500;

const useTrainingSimulation = () => {
    // Phase: 'idle', 'forward', 'backward', 'update'
    const [phase, setPhase] = useState('idle');
    const [activeLayerIndex, setActiveLayerIndex] = useState(-1);

    // State for each layer's memory components
    // Each layer has: weights (always present), activations (present/absent), gradients (present/absent), optimizerState (always present)
    const [layers, setLayers] = useState(() =>
        Array.from({ length: NUM_LAYERS }).map((_, i) => ({
            id: i,
            weights: { version: 0, highlighted: false },
            activations: { present: false, highlighted: false },
            gradients: { present: false, highlighted: false },
            optimizerState: { version: 0, highlighted: false }
        }))
    );

    const updateLayer = useCallback((index, updates) => {
        setLayers(prev => prev.map((layer, i) =>
            i === index ? { ...layer, ...updates } : layer
        ));
    }, []);

    const updateAllLayers = useCallback((updateFn) => {
        setLayers(prev => prev.map(updateFn));
    }, []);

    useEffect(() => {
        let isCancelled = false;
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const runCycle = async () => {
            if (isCancelled) return;

            // --- 1. Idle / Reset ---
            setPhase('idle');
            setActiveLayerIndex(-1);
            // Reset activations and gradients, keep weights and optimizer state
            updateAllLayers(l => ({
                ...l,
                activations: { present: false, highlighted: false },
                gradients: { present: false, highlighted: false },
                weights: { ...l.weights, highlighted: false },
                optimizerState: { ...l.optimizerState, highlighted: false }
            }));
            await wait(DELAY_LONG);
            if (isCancelled) return;

            // --- 2. Forward Pass ---
            setPhase('forward');
            for (let i = 0; i < NUM_LAYERS; i++) {
                if (isCancelled) return;
                setActiveLayerIndex(i);

                // Create activation
                updateLayer(i, {
                    activations: { present: true, highlighted: true }
                });

                await wait(DELAY_NORMAL);

                // Dim activation highlight
                updateLayer(i, {
                    activations: { present: true, highlighted: false }
                });
            }
            if (isCancelled) return;
            setActiveLayerIndex(-1); // Finished forward
            await wait(DELAY_FAST);

            // --- 3. Backward Pass ---
            setPhase('backward');
            for (let i = NUM_LAYERS - 1; i >= 0; i--) {
                if (isCancelled) return;
                setActiveLayerIndex(i);

                // Create gradient
                updateLayer(i, {
                    gradients: { present: true, highlighted: true }
                });

                await wait(DELAY_NORMAL);

                // Dim gradient highlight
                updateLayer(i, {
                    gradients: { present: true, highlighted: false }
                });
            }
            if (isCancelled) return;
            setActiveLayerIndex(-1); // Finished backward
            await wait(DELAY_FAST);

            // --- 4. Optimizer Step (Update Weights) ---
            setPhase('update');

            // Highlight weights and optimizer state to show update
            updateAllLayers(l => ({
                ...l,
                weights: { ...l.weights, highlighted: true, version: l.weights.version + 1 },
                optimizerState: { ...l.optimizerState, highlighted: true, version: l.optimizerState.version + 1 }
            }));

            await wait(DELAY_LONG);

            // Clear gradients and activations (memory freed), dim weights/optimizer
            updateAllLayers(l => ({
                ...l,
                weights: { ...l.weights, highlighted: false },
                optimizerState: { ...l.optimizerState, highlighted: false },
                activations: { present: false, highlighted: false },
                gradients: { present: false, highlighted: false }
            }));

            if (isCancelled) return;

            // Loop
            runCycle();
        };

        runCycle();

        return () => {
            isCancelled = true;
        };
    }, [updateLayer, updateAllLayers]);

    return { phase, layers, activeLayerIndex };
};

// --- Components ---

const MemoryBlock = ({ label, color, active, icon: Icon }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: active ? 1.1 : 1,
            opacity: 1,
            borderColor: active ? color : 'transparent'
        }}
        exit={{ scale: 0, opacity: 0 }}
        className={`
            w-full h-6 rounded flex items-center justify-between px-1.5 text-[9px] font-bold border
            ${active ? 'shadow-sm' : ''}
        `}
        style={{
            backgroundColor: active ? color : '#f1f5f9', // slate-100 for inactive
            color: active ? '#fff' : '#94a3b8', // slate-400 for inactive
            borderColor: active ? 'rgba(0,0,0,0.1)' : 'transparent'
        }}
    >
        <span className="flex items-center gap-1">
            {Icon && <Icon size={8} />}
            {label}
        </span>
    </motion.div>
);

const LayerNode = ({ layer, phase, isActive }) => {
    return (
        <div className="relative flex flex-col items-center gap-2">
            {/* Layer Box */}
            <motion.div
                className="w-24 bg-white rounded-lg border border-slate-200 shadow-sm p-2 flex flex-col gap-1.5"
                animate={{
                    borderColor: isActive ? '#94a3b8' : '#e2e8f0',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
            >
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5 flex justify-between items-center">
                    <span>Layer {layer.id + 1}</span>
                    {layer.weights.highlighted && <Zap size={10} className="text-emerald-500 fill-emerald-500" />}
                </div>

                {/* Weights (Always present) */}
                <MemoryBlock
                    label="Weights"
                    color="#10b981" // emerald-500
                    active={true}
                    icon={Database}
                />

                {/* Optimizer State (Always present) */}
                <MemoryBlock
                    label="Opt State"
                    color="#8b5cf6" // violet-500
                    active={true}
                    icon={Archive}
                />

                {/* Activations (Transient) */}
                <div className="h-6 w-full"> {/* Placeholder to prevent layout shift if we wanted fixed height, but here we stack */}
                    <AnimatePresence mode='popLayout'>
                        {layer.activations.present && (
                            <MemoryBlock
                                key="act"
                                label="Activations"
                                color="#06b6d4" // cyan-500
                                active={true} // Always colored if present
                                icon={Activity}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Gradients (Transient) */}
                <div className="h-6 w-full">
                    <AnimatePresence mode='popLayout'>
                        {layer.gradients.present && (
                            <MemoryBlock
                                key="grad"
                                label="Gradients"
                                color="#f97316" // orange-500
                                active={true}
                                icon={Layers}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

const ConnectionArrow = ({ active, direction = 'right', color = 'text-slate-300' }) => {
    return (
        <div className={`flex items-center justify-center w-8 transition-colors duration-300 ${active ? color : 'text-slate-200'}`}>
            {direction === 'right' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
        </div>
    );
};

const TrainingWorkflow = () => {
    const { phase, layers, activeLayerIndex } = useTrainingSimulation();

    return (
        <div className="p-8 bg-slate-50 rounded-xl overflow-hidden flex flex-col items-center gap-8 font-sans select-none min-h-[400px] justify-center">

            {/* Legend / Status */}
            <div className="flex gap-8 text-sm font-medium uppercase tracking-wider">
                <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'forward' ? 'text-cyan-600 font-bold' : 'text-gray-300'}`}>
                    <Activity size={16} /> Forward
                </div>
                <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'backward' ? 'text-orange-500 font-bold' : 'text-gray-300'}`}>
                    <Layers size={16} /> Backward
                </div>
                <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'update' ? 'text-emerald-600 font-bold' : 'text-gray-300'}`}>
                    <Zap size={16} /> Update
                </div>
            </div>

            {/* Pipeline */}
            <div className="flex items-center gap-1">
                {/* Input */}
                <div className="text-slate-300 px-2">Input</div>
                <ConnectionArrow active={phase === 'forward' && activeLayerIndex === 0} direction="right" color="text-cyan-500" />

                {layers.map((layer, i) => (
                    <React.Fragment key={layer.id}>
                        <LayerNode
                            layer={layer}
                            phase={phase}
                            isActive={i === activeLayerIndex}
                        />
                        {i < NUM_LAYERS - 1 && (
                            <div className="flex flex-col gap-1">
                                {/* Forward Arrow */}
                                <motion.div animate={{ opacity: phase === 'forward' && i === activeLayerIndex ? 1 : 0.1 }}>
                                    <ArrowRight size={16} className="text-cyan-500" />
                                </motion.div>
                                {/* Backward Arrow */}
                                <motion.div animate={{ opacity: phase === 'backward' && i === activeLayerIndex ? 1 : 0.1 }}>
                                    <ArrowLeft size={16} className="text-orange-500" />
                                </motion.div>
                            </div>
                        )}
                    </React.Fragment>
                ))}

                {/* Output / Loss */}
                <div className="flex flex-col gap-1 ml-2">
                    <motion.div animate={{ opacity: phase === 'forward' && activeLayerIndex === -1 ? 1 : 0.1 }}>
                        <ArrowRight size={16} className="text-cyan-500" />
                    </motion.div>
                    <motion.div animate={{ opacity: phase === 'backward' && activeLayerIndex === NUM_LAYERS - 1 ? 1 : 0.1 }}>
                        <ArrowLeft size={16} className="text-orange-500" />
                    </motion.div>
                </div>
                <div className="text-slate-300 px-2">Loss</div>
            </div>

            {/* Memory Legend */}
            <div className="flex gap-6 text-xs text-slate-500 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500"></div>
                    <span>Weights</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-violet-500"></div>
                    <span>Optimizer State</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-cyan-500"></div>
                    <span>Activations</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500"></div>
                    <span>Gradients</span>
                </div>
            </div>
        </div>
    );
};

const TypicalTraining = () => {
    return (
        <Section title="Typical Training Workflow" icon={Box}>
            <InteractiveCard title="Typical Training Workflow">
                <TrainingWorkflow />
                <div className="mt-6 text-slate-700 space-y-4">
                    <Paragraph>
                        Training a Large Language Model (or any deep neural network) involves a repetitive cycle of four key steps:
                    </Paragraph>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Forward Pass:</strong> Input tokens are processed layer by layer. Each layer computes <strong>activations</strong> based on its weights and the previous layer's output. These activations must be stored in memory for the backward pass.
                        </li>
                        <li>
                            <strong>Backward Pass:</strong> Starting from the loss, we compute <strong>gradients</strong> for every parameter. This step traverses the layers in reverse order. The gradients indicate how much each weight contributed to the error.
                        </li>
                        <li>
                            <strong>Optimizer State Update:</strong> Before updating the weights, the optimizer updates its own internal state. For a sophisticated optimizer like <strong>Adam</strong> (Adaptive Moment Estimation), this involves maintaining two extra values for every single parameter:
                            <ul className="list-circle pl-5 mt-1 text-slate-600">
                                <li><strong>First Moment (<Equation>m</Equation>):</strong> An exponential moving average of gradients (momentum).</li>
                                <li><strong>Second Moment (<Equation>v</Equation>):</strong> An exponential moving average of squared gradients (variance).</li>
                            </ul>
                            <span className="text-sm italic block mt-1">These states consume significant memory—often more than the weights themselves!</span>
                        </li>
                        <li>
                            <strong>Weight Update:</strong> Finally, the weights are updated using the gradients and the optimizer state. The memory used for activations and gradients can then be freed for the next batch.
                        </li>
                    </ul>
                </div>
            </InteractiveCard>
        </Section >
    );
};

export default TypicalTraining;
