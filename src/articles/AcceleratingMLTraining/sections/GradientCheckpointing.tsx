import React, { useState, useEffect, useCallback } from 'react';
import { Box, ArrowRight, ArrowLeft, Database, Layers, Zap, Activity, Archive, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../../../components/Section';
import InteractiveCard from '../../../components/InteractiveCard';
import Equation from '../../../components/Equation';
import Paragraph from '../../../components/Paragraph';
import AnimationControls from '../../../components/AnimationControls';

// --- Simulation Hook ---

const NUM_LAYERS = 6;
const CHECKPOINT_INTERVAL = 3; // Checkpoint every 3 layers (0, 3)
const DELAY_FAST = 300;
const DELAY_NORMAL = 600;
const DELAY_LONG = 1200;

const useTrainingSimulation = () => {
    // Phase: 'idle', 'forward', 'backward', 'recompute', 'update'
    const [phase, setPhase] = useState('idle');
    const [activeLayerIndex, setActiveLayerIndex] = useState(-1);
    const [recomputeStartIndex, setRecomputeStartIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(true);
    const isPlayingRef = React.useRef(isPlaying);
    const [resetTrigger, setResetTrigger] = useState(0);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // State for each layer's memory components
    const [layers, setLayers] = useState(() =>
        Array.from({ length: NUM_LAYERS }).map((_, i) => ({
            id: i,
            weights: { version: 0, highlighted: false },
            activations: { present: false, highlighted: false, isCheckpoint: false },
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

    const reset = useCallback(() => {
        setResetTrigger(prev => prev + 1);
        setIsPlaying(true);
    }, []);

    useEffect(() => {
        let isCancelled = false;

        // Custom wait function that respects pausing
        const wait = async (ms) => {
            const step = 50;
            let elapsed = 0;
            while (elapsed < ms) {
                if (isCancelled) return;

                // If paused, loop until playing
                while (!isPlayingRef.current) {
                    if (isCancelled) return;
                    await new Promise(r => setTimeout(r, 100));
                }

                await new Promise(resolve => setTimeout(resolve, step));
                elapsed += step;
            }
        };

        const runCycle = async () => {
            if (isCancelled) return;

            // --- 1. Idle / Reset ---
            setPhase('idle');
            setActiveLayerIndex(-1);
            setRecomputeStartIndex(-1);

            updateAllLayers(l => ({
                ...l,
                activations: { present: false, highlighted: false, isCheckpoint: false },
                gradients: { present: false, highlighted: false },
                weights: { ...l.weights, highlighted: false },
                optimizerState: { ...l.optimizerState, highlighted: false }
            }));
            await wait(DELAY_LONG);
            if (isCancelled) return;

            // --- 2. Forward Pass (with Checkpointing) ---
            setPhase('forward');
            for (let i = 0; i < NUM_LAYERS; i++) {
                if (isCancelled) return;
                setActiveLayerIndex(i);

                const isCheckpoint = i % CHECKPOINT_INTERVAL === 0;

                // Compute activation
                updateLayer(i, {
                    activations: { present: true, highlighted: true, isCheckpoint }
                });

                await wait(DELAY_NORMAL);

                // If NOT a checkpoint, discard it immediately to save memory
                if (!isCheckpoint) {
                    updateLayer(i, {
                        activations: { present: false, highlighted: false, isCheckpoint: false }
                    });
                } else {
                    // Keep checkpoint
                    updateLayer(i, {
                        activations: { present: true, highlighted: false, isCheckpoint: true }
                    });
                }
            }
            if (isCancelled) return;
            setActiveLayerIndex(-1);
            await wait(DELAY_FAST);

            // --- 3. Backward Pass (with Recomputation) ---
            setPhase('backward');
            for (let i = NUM_LAYERS - 1; i >= 0; i--) {
                if (isCancelled) return;
                setActiveLayerIndex(i);

                // Check if we have the activation
                // In our simulation, we know exactly which ones are missing (non-checkpoints)
                const isCheckpoint = i % CHECKPOINT_INTERVAL === 0;

                if (!isCheckpoint) {
                    // --- Recompute Phase ---
                    setPhase('recompute');
                    // Find nearest checkpoint start
                    const start = Math.floor(i / CHECKPOINT_INTERVAL) * CHECKPOINT_INTERVAL;
                    setRecomputeStartIndex(start);

                    // Re-run forward from start to i
                    for (let r = start; r <= i; r++) {
                        if (isCancelled) return;
                        // Temporarily show activation
                        updateLayer(r, {
                            activations: { present: true, highlighted: true, isCheckpoint: r % CHECKPOINT_INTERVAL === 0 }
                        });
                        await wait(DELAY_FAST);
                        // Dim it but keep it until we are done with this segment
                        updateLayer(r, {
                            activations: { present: true, highlighted: false, isCheckpoint: r % CHECKPOINT_INTERVAL === 0 }
                        });
                    }
                    setPhase('backward'); // Back to backward
                    setRecomputeStartIndex(-1);
                }

                // Now we have activation, compute gradient
                updateLayer(i, {
                    gradients: { present: true, highlighted: true }
                });

                await wait(DELAY_NORMAL);

                // Dim gradient
                updateLayer(i, {
                    gradients: { present: true, highlighted: false }
                });

                // If this was a recomputed (non-checkpoint) activation, we can discard it now?
                // In real implementations, we discard it after using it.
                if (!isCheckpoint) {
                    updateLayer(i, {
                        activations: { present: false, highlighted: false, isCheckpoint: false }
                    });
                }
            }
            if (isCancelled) return;
            setActiveLayerIndex(-1);
            await wait(DELAY_FAST);

            // --- 4. Optimizer Step ---
            setPhase('update');
            updateAllLayers(l => ({
                ...l,
                weights: { ...l.weights, highlighted: true, version: l.weights.version + 1 },
                optimizerState: { ...l.optimizerState, highlighted: true, version: l.optimizerState.version + 1 }
            }));

            await wait(DELAY_LONG);

            // Cleanup
            updateAllLayers(l => ({
                ...l,
                weights: { ...l.weights, highlighted: false },
                optimizerState: { ...l.optimizerState, highlighted: false },
                activations: { present: false, highlighted: false, isCheckpoint: false },
                gradients: { present: false, highlighted: false }
            }));

            if (isCancelled) return;
            runCycle();
        };

        runCycle();

        return () => {
            isCancelled = true;
        };
    }, [updateLayer, updateAllLayers, resetTrigger]);

    return { phase, layers, activeLayerIndex, recomputeStartIndex, isPlaying, setIsPlaying, reset };
};

// --- Components ---

const MemoryBlock = React.forwardRef(({ label, color, active, icon: Icon, dashed = false }, ref) => (
    <motion.div
        ref={ref}
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
            ${dashed ? 'border-dashed border-2' : ''}
        `}
        style={{
            backgroundColor: active ? color : '#f1f5f9',
            color: active ? '#fff' : '#94a3b8',
            borderColor: active ? 'rgba(0,0,0,0.1)' : 'transparent'
        }}
    >
        <span className="flex items-center gap-1">
            {Icon && <Icon size={8} />}
            {label}
        </span>
    </motion.div>
));

const LayerNode = ({ layer, phase, isActive }) => {
    return (
        <div className="relative flex flex-col items-center gap-2">
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

                <MemoryBlock
                    label="Weights"
                    color="#10b981"
                    active={true}
                    icon={Database}
                />

                <MemoryBlock
                    label="Opt State"
                    color="#8b5cf6"
                    active={true}
                    icon={Archive}
                />

                <div className="h-6 w-full">
                    <AnimatePresence mode='popLayout'>
                        {layer.activations.present && (
                            <MemoryBlock
                                key="act"
                                label={layer.activations.isCheckpoint ? "Checkpoint" : "Activation"}
                                color={layer.activations.isCheckpoint ? "#0e7490" : "#06b6d4"} // Darker cyan for checkpoint
                                active={true}
                                icon={Activity}
                                dashed={!layer.activations.isCheckpoint} // Dashed for temporary recomputed ones
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-6 w-full">
                    <AnimatePresence mode='popLayout'>
                        {layer.gradients.present && (
                            <MemoryBlock
                                key="grad"
                                label="Gradients"
                                color="#f97316"
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

const GradientCheckpointingWorkflow = () => {
    const { phase, layers, activeLayerIndex, recomputeStartIndex, isPlaying, setIsPlaying, reset } = useTrainingSimulation();

    return (
        <div className="relative p-8 bg-slate-50 rounded-xl overflow-hidden flex flex-col items-center gap-8 font-sans select-none min-h-[400px] justify-center">
            <AnimationControls
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onReset={reset}
            />

            {/* Legend / Status */}
            <div className="flex gap-8 text-sm font-medium uppercase tracking-wider">
                <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'forward' ? 'text-cyan-600 font-bold' : 'text-gray-300'}`}>
                    <Activity size={16} /> Forward
                </div>
                <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'backward' ? 'text-orange-500 font-bold' : 'text-gray-300'}`}>
                    <Layers size={16} /> Backward
                </div>
                <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'recompute' ? 'text-blue-600 font-bold' : 'text-gray-300'}`}>
                    <RefreshCw size={16} className={phase === 'recompute' ? 'animate-spin' : ''} /> Recompute
                </div>
                <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'update' ? 'text-emerald-600 font-bold' : 'text-gray-300'}`}>
                    <Zap size={16} /> Update
                </div>
            </div>

            {/* Pipeline */}
            <div className="flex items-center gap-1">
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
                                <motion.div animate={{ opacity: (phase === 'forward' || phase === 'recompute') && i === activeLayerIndex ? 1 : 0.1 }}>
                                    <ArrowRight size={16} className={phase === 'recompute' ? "text-blue-500" : "text-cyan-500"} />
                                </motion.div>
                                {/* Backward Arrow */}
                                <motion.div animate={{ opacity: phase === 'backward' && i === activeLayerIndex ? 1 : 0.1 }}>
                                    <ArrowLeft size={16} className="text-orange-500" />
                                </motion.div>
                            </div>
                        )}
                    </React.Fragment>
                ))}

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
                    <div className="w-3 h-3 rounded bg-cyan-700"></div>
                    <span>Checkpoint</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-cyan-500"></div>
                    <span>Activation (Temp)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500"></div>
                    <span>Gradients</span>
                </div>
            </div>
        </div>
    );
};

const GradientCheckpointing = () => {
    return (
        <Section title="Gradient Checkpointing" icon={RefreshCw}>
            <InteractiveCard title="Gradient Checkpointing">
                <div className="mt-6 text-slate-700 space-y-4">
                    <Paragraph>
                        As models grow deeper, storing all activations for the backward pass becomes a massive memory bottleneck. <strong>Gradient Checkpointing</strong> (also known as Activation Checkpointing) is a technique to trade <strong>compute for memory</strong>.
                    </Paragraph>
                    <Paragraph>
                        Instead of storing activations for <em>every</em> layer during the forward pass, we only store them for a subset of "checkpoint" layers.
                    </Paragraph>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Forward Pass (Memory Saving):</strong> We run the forward pass as usual but drop the intermediate activations between checkpoints. This significantly reduces peak memory usage.
                        </li>
                        <li>
                            <strong>Backward Pass (Recomputation):</strong> When the backward pass needs an activation that was dropped, we <strong>recompute</strong> it by running a partial forward pass starting from the nearest checkpoint.
                        </li>
                    </ul>
                    <Paragraph>
                        This technique can reduce activation memory by a factor of <Equation>\sqrt{'{'}N{'}'}</Equation> (where <Equation>N</Equation> is the number of layers) at the cost of performing roughly 33% more floating-point operations (one extra forward pass per layer).
                    </Paragraph>
                    <Paragraph>
                        Most training frameworks these days use <strong>FlashAttention</strong>, which natively integrates activation recomputation in its optimization strategy by recomputing attention scores and matrices in the backward pass instead of storing them.
                    </Paragraph>
                </div>
                <GradientCheckpointingWorkflow />
            </InteractiveCard>
        </Section >
    );
};

export default GradientCheckpointing;
