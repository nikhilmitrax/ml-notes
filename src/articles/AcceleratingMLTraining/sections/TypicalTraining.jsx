import React from 'react';
import { Box, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '../../../components/Section';
import Header3 from '../../../components/Header3';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';
import InteractiveCard from '../../../components/InteractiveCard';

const TrainingWorkflow = () => {
    const [phase, setPhase] = React.useState('idle'); // idle, forward, backward, update
    const [activeStep, setActiveStep] = React.useState(-1);
    const numLayers = 6;
    React.useEffect(() => {
        let isCancelled = false;

        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const runCycle = async () => {
            if (isCancelled) return;

            // 1. Idle / Reset
            setPhase('idle');
            setActiveStep(-1);
            await wait(1000);
            if (isCancelled) return;

            // 2. Forward Pass
            setPhase('forward');
            for (let i = 0; i < numLayers; i++) {
                if (isCancelled) return;
                setActiveStep(i);
                await wait(800);
            }
            if (isCancelled) return;
            await wait(500);
            if (isCancelled) return;

            // 3. Backward Pass
            setPhase('backward');
            for (let i = numLayers - 1; i >= 0; i--) {
                if (isCancelled) return;
                setActiveStep(i);
                await wait(800);
            }
            if (isCancelled) return;
            await wait(500);
            if (isCancelled) return;

            // 4. Update
            setPhase('update');
            setActiveStep(-1);
            await wait(2000);
            if (isCancelled) return;

            // Loop
            runCycle();
        };

        runCycle();

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <div className="p-8 bg-slate-50 rounded-xl overflow-hidden flex flex-col items-center gap-8 font-sans select-none min-h-[300px] justify-center">

            {/* Status Indicator */}
            <div className="flex gap-8 text-sm font-medium uppercase tracking-wider">
                <div className={`transition-colors duration-300 ${phase === 'forward' ? 'text-cyan-600 font-bold' : 'text-gray-300'}`}>
                    Forward Pass
                </div>
                <div className={`transition-colors duration-300 ${phase === 'backward' ? 'text-orange-500 font-bold' : 'text-gray-300'}`}>
                    Backward Pass
                </div>
                <div className={`transition-colors duration-300 ${phase === 'update' ? 'text-emerald-600 font-bold' : 'text-gray-300'}`}>
                    Weight Update
                </div>
            </div>

            {/* Main Pipeline Visualization */}
            <div className="flex items-center gap-2">
                {/* Input Arrow */}
                <div className="text-gray-400">
                    <ArrowRight size={24} />
                </div>

                {Array.from({ length: numLayers }).map((_, i) => {
                    // Determine state of this block
                    const hasActivation = (phase === 'forward' && i <= activeStep) || phase === 'backward' || phase === 'update';
                    const hasGradient = (phase === 'backward' && i >= activeStep) || phase === 'update';
                    const isUpdating = phase === 'update';

                    return (
                        <React.Fragment key={i}>
                            {/* Block */}
                            <div className="relative">
                                <motion.div
                                    className={`
                                        w-16 h-24 rounded-lg border-2 shadow-sm flex flex-col items-center justify-center gap-2 transition-colors duration-500
                                        ${isUpdating ? 'bg-emerald-100 border-emerald-500' : 'bg-white border-slate-300'}
                                    `}
                                    animate={isUpdating ? { scale: [1, 1.1, 1], borderColor: "#10b981" } : { scale: 1 }}
                                >
                                    {/* Layer Label */}
                                    <span className="text-[10px] text-slate-400 absolute top-1">L{i + 1}</span>

                                    {/* Activation Indicator */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            opacity: hasActivation ? 1 : 0.1,
                                            scale: hasActivation ? 1 : 0.8,
                                            backgroundColor: hasActivation ? "#06b6d4" : "#e2e8f0" // cyan-500
                                        }}
                                        className="w-10 h-6 rounded bg-slate-200 flex items-center justify-center text-[8px] text-white font-bold"
                                    >
                                        {hasActivation && "ACT"}
                                    </motion.div>

                                    {/* Gradient Indicator */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            opacity: hasGradient ? 1 : 0.1,
                                            scale: hasGradient ? 1 : 0.8,
                                            backgroundColor: hasGradient ? "#f97316" : "#e2e8f0" // orange-500
                                        }}
                                        className="w-10 h-6 rounded bg-slate-200 flex items-center justify-center text-[8px] text-white font-bold"
                                    >
                                        {hasGradient && "GRAD"}
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Connection Arrow */}
                            {i < numLayers - 1 && (
                                <div className="w-8 flex flex-col items-center justify-center gap-1 h-24">
                                    {/* Forward Arrow */}
                                    <motion.div
                                        animate={{
                                            opacity: (phase === 'forward' && i < activeStep) || phase === 'backward' || phase === 'update' ? 1 : 0.2,
                                            x: (phase === 'forward' && i === activeStep) ? [0, 5, 0] : 0
                                        }}
                                        className="text-cyan-500"
                                    >
                                        <ArrowRight size={16} />
                                    </motion.div>

                                    {/* Backward Arrow */}
                                    <motion.div
                                        animate={{
                                            opacity: (phase === 'backward' && i >= activeStep) || phase === 'update' ? 1 : 0.2,
                                            x: (phase === 'backward' && i === activeStep) ? [0, -5, 0] : 0
                                        }}
                                        className="text-orange-500"
                                    >
                                        <ArrowLeft size={16} />
                                    </motion.div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}

                {/* Output / Loss Gradients */}
                <div className="w-8 h-24 flex flex-col items-center justify-center gap-1">
                    {/* Forward Output */}
                    <motion.div
                        animate={{ opacity: phase === 'forward' || phase === 'idle' ? 1 : 0.2 }}
                        className="text-gray-400"
                    >
                        <ArrowRight size={24} />
                    </motion.div>

                    {/* Backward Gradient Input */}
                    <motion.div
                        animate={{
                            opacity: phase === 'backward' || phase === 'update' ? 1 : 0.2,
                            x: (phase === 'backward' && activeStep === numLayers - 1) ? [0, -5, 0] : 0
                        }}
                        className="text-orange-500"
                    >
                        <ArrowLeft size={24} />
                    </motion.div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-cyan-500"></div>
                    <span>Activations</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500"></div>
                    <span>Gradients</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500"></div>
                    <span>Updated Weights</span>
                </div>
            </div>
        </div>
    );
}

const TypicalTraining = () => {
    return (
        <Section title="Typical Training Workflow" icon={Box}>
            <InteractiveCard title="Typical Training Workflow">
                <TrainingWorkflow />
            </InteractiveCard>
        </Section >
    );
};

export default TypicalTraining;
