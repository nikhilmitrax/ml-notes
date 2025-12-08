import React, { useState, useEffect, useCallback } from 'react';
import { Box, ArrowRight, ArrowLeft, Database, Layers, Zap, Activity, Archive, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../../../components/Section';
import InteractiveCard from '../../../components/InteractiveCard';
import Equation from '../../../components/Equation';
import Paragraph from '../../../components/Paragraph';
import AnimationControls from '../../../components/AnimationControls';

// --- Simulation Hook ---

const NUM_LAYERS = 4; // Simplified for accumulation demo
const MICRO_BATCHES = 3;
const DELAY_FAST = 300;
const DELAY_NORMAL = 600;
const DELAY_LONG = 1200;

const useTrainingSimulation = () => {
    // Phase: 'idle', 'forward', 'backward', 'accumulate', 'update'
    const [phase, setPhase] = useState('idle');
    const [activeLayerIndex, setActiveLayerIndex] = useState(-1);
    const [currentMicroBatch, setCurrentMicroBatch] = useState(0);
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
            activations: { present: false, highlighted: false },
            gradients: { present: false, highlighted: false }, // Current micro-batch gradients
            accumulatedGradients: { count: 0, highlighted: false }, // Accumulated buffer
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

        const wait = async (ms) => {
            const step = 50;
            let elapsed = 0;
            while (elapsed < ms) {
                if (isCancelled) return;
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
            setCurrentMicroBatch(0);
            setActiveLayerIndex(-1);
            updateAllLayers(l => ({
                ...l,
                activations: { present: false, highlighted: false },
                gradients: { present: false, highlighted: false },
                accumulatedGradients: { count: 0, highlighted: false },
                weights: { ...l.weights, highlighted: false },
                optimizerState: { ...l.optimizerState, highlighted: false }
            }));
            await wait(DELAY_LONG);
            if (isCancelled) return;

            // --- Loop through Micro-batches ---
            for (let mb = 1; mb <= MICRO_BATCHES; mb++) {
                setCurrentMicroBatch(mb);

                // --- Forward Pass ---
                setPhase('forward');
                for (let i = 0; i < NUM_LAYERS; i++) {
                    if (isCancelled) return;
                    setActiveLayerIndex(i);
                    updateLayer(i, {
                        activations: { present: true, highlighted: true }
                    });
                    await wait(DELAY_FAST);
                    updateLayer(i, {
                        activations: { present: true, highlighted: false }
                    });
                }
                if (isCancelled) return;
                setActiveLayerIndex(-1);
                await wait(DELAY_FAST);

                // --- Backward Pass ---
                setPhase('backward');
                for (let i = NUM_LAYERS - 1; i >= 0; i--) {
                    if (isCancelled) return;
                    setActiveLayerIndex(i);
                    // Compute gradient
                    updateLayer(i, {
                        gradients: { present: true, highlighted: true }
                    });
                    await wait(DELAY_FAST);

                    // Accumulate immediately after computing for this layer
                    setPhase('accumulate');
                    updateLayer(i, {
                        gradients: { present: true, highlighted: false },
                        accumulatedGradients: { count: mb, highlighted: true }
                    });
                    await wait(DELAY_FAST);

                    updateLayer(i, {
                        accumulatedGradients: { count: mb, highlighted: false },
                        // Free activation and current gradient immediately to show memory savings? 
                        // Or wait until end of backward? Let's free activation now as is typical.
                        activations: { present: false, highlighted: false },
                        gradients: { present: false, highlighted: false }
                    });
                    setPhase('backward');
                }
                if (isCancelled) return;
                setActiveLayerIndex(-1);
                await wait(DELAY_NORMAL);
            }

            // --- Optimizer Step ---
            setPhase('update');
            updateAllLayers(l => ({
                ...l,
                weights: { ...l.weights, highlighted: true, version: l.weights.version + 1 },
                optimizerState: { ...l.optimizerState, highlighted: true, version: l.optimizerState.version + 1 }
            }));
            await wait(DELAY_LONG);

            // --- Cleanup ---
            updateAllLayers(l => ({
                ...l,
                weights: { ...l.weights, highlighted: false },
                optimizerState: { ...l.optimizerState, highlighted: false },
                accumulatedGradients: { count: 0, highlighted: false }
            }));

            if (isCancelled) return;
            runCycle();
        };

        runCycle();

        return () => {
            isCancelled = true;
        };
    }, [updateLayer, updateAllLayers, resetTrigger]);

    return { phase, layers, activeLayerIndex, currentMicroBatch, isPlaying, setIsPlaying, reset };
};

// --- Components ---

const MemoryBlock = React.forwardRef(({ label, color, active, icon: Icon, count, dashed = false }, ref) => (
    <motion.div
        ref={ref}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: active ? 1.1 : 1,
            opacity: active ? 1 : 0.5,
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
        {count !== undefined && count > 0 && (
            <span className="bg-white/20 px-1 rounded text-[8px]">{count}x</span>
        )}
    </motion.div>
));

const LayerNode = ({ layer, phase, isActive }) => {
    return (
        <div className="relative flex flex-col items-center gap-2">
            <motion.div
                className="w-28 bg-white rounded-lg border border-slate-200 shadow-sm p-2 flex flex-col gap-1.5"
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
                                label="Activations"
                                color="#06b6d4"
                                active={true}
                                icon={Activity}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Current Gradients (Transient) */}
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

                {/* Accumulated Gradients (Persistent) */}
                <div className="h-6 w-full">
                    <AnimatePresence mode='popLayout'>
                        {layer.accumulatedGradients.count > 0 && (
                            <MemoryBlock
                                key="acc_grad"
                                label="Accum Grad"
                                color="#ea580c" // Darker orange
                                active={true}
                                icon={Layers}
                                count={layer.accumulatedGradients.count}
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

const GradientAccumulationWorkflow = () => {
    const { phase, layers, activeLayerIndex, currentMicroBatch, isPlaying, setIsPlaying, reset } = useTrainingSimulation();

    return (
        <div className="relative p-8 bg-slate-50 rounded-xl overflow-hidden flex flex-col items-center gap-8 font-sans select-none min-h-[400px] justify-center">
            <AnimationControls
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onReset={reset}
            />

            {/* Legend / Status */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex gap-8 text-sm font-medium uppercase tracking-wider">
                    <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'forward' ? 'text-cyan-600 font-bold' : 'text-gray-300'}`}>
                        <Activity size={16} /> Forward
                    </div>
                    <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'backward' ? 'text-orange-500 font-bold' : 'text-gray-300'}`}>
                        <Layers size={16} /> Backward
                    </div>
                    <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'accumulate' ? 'text-orange-700 font-bold' : 'text-gray-300'}`}>
                        <Plus size={16} /> Accumulate
                    </div>
                    <div className={`flex items-center gap-2 transition-colors duration-300 ${phase === 'update' ? 'text-emerald-600 font-bold' : 'text-gray-300'}`}>
                        <Zap size={16} /> Update
                    </div>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    Micro-batch: {currentMicroBatch} / {MICRO_BATCHES}
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
                                <motion.div animate={{ opacity: phase === 'forward' && i === activeLayerIndex ? 1 : 0.1 }}>
                                    <ArrowRight size={16} className="text-cyan-500" />
                                </motion.div>
                                {/* Backward Arrow */}
                                <motion.div animate={{ opacity: (phase === 'backward' || phase === 'accumulate') && i === activeLayerIndex ? 1 : 0.1 }}>
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
                    <motion.div animate={{ opacity: (phase === 'backward' || phase === 'accumulate') && activeLayerIndex === NUM_LAYERS - 1 ? 1 : 0.1 }}>
                        <ArrowLeft size={16} className="text-orange-500" />
                    </motion.div>
                </div>
                <div className="text-slate-300 px-2">Loss</div>
            </div>

            {/* Memory Legend */}
            <div className="flex gap-6 text-xs text-slate-500 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-cyan-500"></div>
                    <span>Activations</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500"></div>
                    <span>Gradients</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-700"></div>
                    <span>Accumulated Gradients</span>
                </div>
            </div>
        </div>
    );
};

const GradientAccumulation = () => {
    return (
        <Section title="Gradient Accumulation" icon={Layers}>
            <InteractiveCard title="Gradient Accumulation">
                <div className="mt-6 text-slate-700 space-y-4">
                    <Paragraph>
                        Sometimes, the maximum batch size that fits in GPU memory is too small for stable training. <strong>Gradient Accumulation</strong> allows us to simulate a larger "effective" batch size by splitting a large batch into smaller <strong>micro-batches</strong>.
                    </Paragraph>
                    <Paragraph>
                        Instead of updating weights after every micro-batch, we:
                    </Paragraph>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Run Forward & Backward</strong> for a micro-batch.
                        </li>
                        <li>
                            <strong>Accumulate Gradients</strong> (add them to a buffer) instead of updating weights immediately.
                        </li>
                        <li>
                            <strong>Discard Activations</strong> to free up memory for the next micro-batch.
                        </li>
                        <li>
                            <strong>Repeat</strong> for <Equation>N</Equation> micro-batches.
                        </li>
                        <li>
                            <strong>Update Weights</strong> only once using the sum (or average) of all accumulated gradients.
                        </li>
                    </ul>
                    <Paragraph>
                        This enables training with a large effective batch size even on hardware with limited memory, at the cost of slightly more time per step (due to overhead) but without extra recomputation.
                    </Paragraph>
                </div>
                <GradientAccumulationWorkflow />
            </InteractiveCard>
        </Section >
    );
};

export default GradientAccumulation;
